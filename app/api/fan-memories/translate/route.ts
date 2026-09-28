import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["en", "pt", "es", "fr", "de", "it", "ja"]);

function json(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function myMemoryLang(code: string) {
  const map: Record<string, string> = {
    en: "en",
    pt: "pt",
    es: "es",
    fr: "fr",
    de: "de",
    it: "it",
    ja: "ja",
  };
  return map[code] || code;
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return json("Server configuration is incomplete.", 500);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json("Invalid request.");
  }

  const memoryId = typeof body?.memory_id === "string" ? body.memory_id.trim() : "";
  const targetLanguage =
    typeof body?.target_language === "string"
      ? body.target_language.trim().toLowerCase()
      : "";

  if (!memoryId) return json("Memory ID is required.");
  if (!ALLOWED.has(targetLanguage)) return json("Unsupported language.");
  if (targetLanguage !== "en") {
  return json("Translations are available in English only.", 400);
}

  // Important: fetch original story from the database.
  // Never trust client-supplied story/source language.
  const { data: memory, error: memoryError } = await admin
    .from("fan_memories")
    .select("id, story, original_language, status")
    .eq("id", memoryId)
    .single();

  if (memoryError || !memory) return json("Memory not found.", 404);
 

  const sourceLanguage = String(memory.original_language || "").toLowerCase().slice(0, 2);

  if (!ALLOWED.has(sourceLanguage)) {
    return json("The original language is not supported.", 400);
  }

  if (targetLanguage === sourceLanguage) {
    return NextResponse.json({
      translated_story: memory.story,
      language: targetLanguage,
      cached: true,
      original: true,
    });
  }

  const { data: cached, error: cacheError } = await admin
    .from("fan_memory_translations")
    .select("translated_story")
    .eq("memory_id", memoryId)
    .eq("language_code", targetLanguage)
    .maybeSingle();

  if (cacheError) {
    console.error("Fan Memory translation cache read failed:", cacheError);
  }

  if (cached?.translated_story) {
    return NextResponse.json({
      translated_story: cached.translated_story,
      language: targetLanguage,
      cached: true,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const source = myMemoryLang(sourceLanguage);
    const target = myMemoryLang(targetLanguage);

    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", memory.story);
    url.searchParams.set("langpair", `${source}|${target}`);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Ne-Yo World Fan Memories",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return json("Translation service is temporarily unavailable.", 502);
    }

    const data = await response.json();
    const translated =
      typeof data?.responseData?.translatedText === "string"
        ? data.responseData.translatedText.trim()
        : "";

    if (!translated) {
      return json("Translation could not be generated.", 502);
    }

    const quotaFinished =
      String(data?.responseStatus || "") === "429" ||
      /quota|limit/i.test(String(data?.responseDetails || ""));

    if (quotaFinished) {
      return json("Translation quota is temporarily unavailable. Please try again later.", 429);
    }

    const { error: upsertError } = await admin
      .from("fan_memory_translations")
      .upsert(
        {
          memory_id: memoryId,
          language_code: targetLanguage,
          translated_story: translated,
        },
        { onConflict: "memory_id,language_code" }
      );

    if (upsertError) {
      console.error("Fan Memory translation cache write failed:", upsertError);
      // Translation can still be returned even if caching failed.
    }

    return NextResponse.json({
      translated_story: translated,
      language: targetLanguage,
      cached: false,
    });
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return json("Translation service timed out. Please try again.", 504);
    }

    console.error("Fan Memory translation failed:", error);
    return json("Translation could not be generated.", 500);
  } finally {
    clearTimeout(timeout);
  }
}
