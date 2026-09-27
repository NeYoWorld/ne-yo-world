import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPPORTED_LANGUAGES = new Set([
  "en",
  "pt",
  "es",
  "fr",
  "de",
  "it",
  "ja",
]);

type TranslateRequest = {
  messageId?: string;
  targetLanguage?: string;

  // The current client may still send these fields.
  // They are intentionally ignored for security.
  sourceLanguage?: string;
  originalText?: string;
};

type MyMemoryResponse = {
  responseData?: {
    translatedText?: string;
  };
  responseStatus?: number | string;
  responseDetails?: string;
  quotaFinished?: boolean;
};

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serverSecret =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serverSecret) {
      console.error(
        "World Messages translate route: missing Supabase server environment variables."
      );

      return jsonError(
        "Translation service is not configured.",
        500
      );
    }

    let body: TranslateRequest;

    try {
      body = (await request.json()) as TranslateRequest;
    } catch {
      return jsonError("Invalid request body.", 400);
    }

    const messageId =
      typeof body.messageId === "string"
        ? body.messageId.trim()
        : "";

    const targetLanguage =
      typeof body.targetLanguage === "string"
        ? body.targetLanguage.trim().toLowerCase()
        : "";

    if (!messageId) {
      return jsonError("Missing message ID.", 400);
    }

    if (!SUPPORTED_LANGUAGES.has(targetLanguage)) {
      return jsonError("Unsupported target language.", 400);
    }
    if (targetLanguage !== "en") {
  return jsonError("Translations are available in English only.", 400);
}

    const supabase = createClient(
      supabaseUrl,
      serverSecret,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    /*
      SECURITY:
      Never trust originalText or sourceLanguage sent by the browser.

      The route reads the approved parent message directly from Supabase
      and uses the database values as the only translation source.
    */
    const {
      data: message,
      error: messageError,
    } = await supabase
      .from("world_messages")
      .select(
        "id, original_language, original_text, status"
      )
      .eq("id", messageId)
      .maybeSingle();

    if (messageError) {
      console.error(
        "World Messages translate route - message lookup error:",
        {
          message: messageError.message,
          code: messageError.code,
          details: messageError.details,
          hint: messageError.hint,
        }
      );

      return jsonError(
        "Could not load the message.",
        500
      );
    }

    if (!message) {
      return jsonError("Message not found.", 404);
    }

    if (message.status !== "approved") {
      return jsonError(
        "This message is not available for translation.",
        403
      );
    }

    const sourceLanguage =
      typeof message.original_language === "string"
        ? message.original_language.trim().toLowerCase()
        : "";

    const originalText =
      typeof message.original_text === "string"
        ? message.original_text.trim()
        : "";

    if (!SUPPORTED_LANGUAGES.has(sourceLanguage)) {
      return jsonError(
        "The message language is not supported.",
        400
      );
    }

    if (
      originalText.length < 1 ||
      originalText.length > 500
    ) {
      return jsonError(
        "The original message is invalid.",
        400
      );
    }

    if (sourceLanguage === targetLanguage) {
      return NextResponse.json({
        translatedText: originalText,
        cached: true,
      });
    }

    /*
      Reuse an existing published translation whenever possible.
    */
    const {
      data: existingTranslation,
      error: existingTranslationError,
    } = await supabase
      .from("world_message_translations")
      .select("translated_text")
      .eq("message_id", messageId)
      .eq("language_code", targetLanguage)
      .eq("is_published", true)
      .maybeSingle();

    if (existingTranslationError) {
      console.error(
        "World Messages translate route - cache lookup error:",
        {
          message: existingTranslationError.message,
          code: existingTranslationError.code,
          details: existingTranslationError.details,
          hint: existingTranslationError.hint,
        }
      );

      return jsonError(
        "Could not check the saved translation.",
        500
      );
    }

    if (
      existingTranslation?.translated_text &&
      existingTranslation.translated_text.trim()
    ) {
      return NextResponse.json({
        translatedText:
          existingTranslation.translated_text,
        cached: true,
      });
    }

    /*
      Generate a missing translation with MyMemory.

      MYMEMORY_EMAIL is optional but, when configured, is sent through
      the documented "de" parameter.
    */
    const params = new URLSearchParams({
      q: originalText,
      langpair: `${sourceLanguage}|${targetLanguage}`,
      mt: "1",
    });

    const myMemoryEmail =
      process.env.MYMEMORY_EMAIL?.trim();

    if (myMemoryEmail) {
      params.set("de", myMemoryEmail);
    }

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      15000
    );

    let translationResponse: Response;

    try {
      translationResponse = await fetch(
        `https://api.mymemory.translated.net/get?${params.toString()}`,
        {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        }
      );
    } catch (error) {
      clearTimeout(timeout);

      console.error(
        "World Messages translate route - MyMemory request failed:",
        error
      );

      return jsonError(
        "Automatic translation is temporarily unavailable.",
        502
      );
    }

    clearTimeout(timeout);

    let translationData: MyMemoryResponse;

    try {
      translationData =
        (await translationResponse.json()) as MyMemoryResponse;
    } catch {
      return jsonError(
        "The translation service returned an invalid response.",
        502
      );
    }

    if (!translationResponse.ok) {
      console.error(
        "World Messages translate route - MyMemory HTTP error:",
        translationResponse.status,
        translationData
      );

      return jsonError(
        "Automatic translation is temporarily unavailable.",
        502
      );
    }

    if (translationData.quotaFinished === true) {
      return jsonError(
        "The free translation quota has been reached. Please try again later.",
        429
      );
    }

    const responseStatus = Number(
      translationData.responseStatus ?? 200
    );

    if (
      Number.isFinite(responseStatus) &&
      responseStatus >= 400
    ) {
      console.error(
        "World Messages translate route - MyMemory API error:",
        translationData
      );

      return jsonError(
        translationData.responseDetails ||
          "Automatic translation failed.",
        responseStatus === 429 ? 429 : 502
      );
    }

    const translatedText =
      translationData.responseData?.translatedText?.trim();

    if (!translatedText) {
      console.error(
        "World Messages translate route - empty translation:",
        translationData
      );

      return jsonError(
        "The translation service returned an empty translation.",
        502
      );
    }

    /*
      Cache the generated translation.

      The unique key (message_id, language_code) ensures one stored
      translation per message/language pair.
    */
    const {
      error: saveError,
    } = await supabase
      .from("world_message_translations")
      .upsert(
        {
          message_id: messageId,
          language_code: targetLanguage,
          translated_text: translatedText,
          is_published: true,
        },
        {
          onConflict:
            "message_id,language_code",
        }
      );

    if (saveError) {
      console.error(
        "World Messages translate route - translation save error:",
        {
          message: saveError.message,
          code: saveError.code,
          details: saveError.details,
          hint: saveError.hint,
        }
      );

      return jsonError(
        "Translation was generated but could not be saved.",
        500
      );
    }

    return NextResponse.json({
      translatedText,
      cached: false,
    });
  } catch (error) {
    console.error(
      "World Messages translate route - unexpected error:",
      error
    );

    return jsonError(
      "Unexpected translation error.",
      500
    );
  }
}
