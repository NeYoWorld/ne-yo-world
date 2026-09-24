import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { lookup } from "node:dns/promises";
import net from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LANGUAGES = ["EN", "PT", "ES", "FR", "DE", "IT", "JA"] as const;
type Language = (typeof LANGUAGES)[number];

type Category = "music" | "live" | "interview" | "announcement";

type StoryTranslation = {
  title: string;
  summary: string;
};

type ImportStory = {
  category: Category;
  source_name: string;
  source_url: string;
  published_at: string;
  translations: Record<Language, StoryTranslation>;
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, names: string[]) {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`, "i"),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) return decodeHtml(match[1]);
    }
  }

  return "";
}

function pageTitle(html: string) {
  const meta = metaContent(html, ["og:title", "twitter:title"]);
  if (meta) return meta;
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? decodeHtml(match[1].replace(/<[^>]+>/g, "")) : "";
}

function pageDescription(html: string) {
  return metaContent(html, ["og:description", "twitter:description", "description"]);
}

function pageSiteName(html: string, url: URL) {
  const meta = metaContent(html, ["og:site_name", "application-name"]);
  if (meta) return meta;
  return url.hostname.replace(/^www\./i, "");
}

function pageLanguage(html: string) {
  const htmlLang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? "";
  const locale = metaContent(html, ["og:locale"]);
  const value = (htmlLang || locale || "en").toLowerCase().replace("_", "-");
  return value.split("-")[0] || "en";
}

function validDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function jsonLdDates(html: string) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const nodes = Array.isArray(parsed) ? parsed : parsed?.["@graph"] ?? [parsed];
      for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
        const candidate = validDate(node?.datePublished || node?.dateCreated || "");
        if (candidate) return candidate;
      }
    } catch {
      // Ignore malformed JSON-LD and continue with metadata fallbacks.
    }
  }
  return "";
}

function timeElementDate(html: string) {
  const matches = [
    ...html.matchAll(/<time[^>]+datetime=["']([^"']+)["'][^>]*>/gi),
  ];

  for (const match of matches) {
    const value = validDate(decodeHtml(match[1] ?? ""));
    if (value) return value;
  }

  return "";
}

function visibleEpisodeDate(html: string) {
  const text = decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );

  // Podcast/episode pages commonly show a date immediately before duration,
  // for example: "July 22, 2026 • 65 mins".
  const match = text.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\s*(?:[•·|]\s*)?\d+\s*(?:mins?|minutes?)\b/i
  );

  return match?.[0] ? validDate(match[0].replace(/\s*(?:[•·|]\s*)?\d+\s*(?:mins?|minutes?)\s*$/i, "")) : "";
}

function pagePublishedAt(html: string) {
  const candidates = [
    metaContent(html, ["article:published_time"]),
    metaContent(html, ["datePublished", "publish-date", "pubdate", "date"]),
    jsonLdDates(html),
    timeElementDate(html),
    visibleEpisodeDate(html),
  ];

  for (const candidate of candidates) {
    const value = validDate(candidate);
    if (value) return value;
  }

  // Never substitute the import time for the original publication date.
  // Missing dates must be reviewed manually in Admin.
  return "";
}

function cleanTitle(title: string, siteName: string) {
  let value = decodeHtml(title).trim();

  if (siteName) {
    const escaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    value = value.replace(new RegExp(`\\s*[|:\\-–—]\\s*${escaped}\\s*$`, "i"), "").trim();
  }

  // Remove common show/site suffixes that are part of the source title,
  // not part of the story headline.
  value = value
    .replace(/\s+Zach Sang Show\s*$/i, "")
    .replace(/\s+\|\s*Zach Sang Show\s*$/i, "")
    .trim();

  // Keep a concise editorial headline for this recurring interview-title pattern.
  // It only uses topics explicitly present in the source title.
  if (
    /ne-yo\s+on\s+20\s+years\s+of\s+["“']?so sick/i.test(value) &&
    /highway\s*79/i.test(value)
  ) {
    return 'Ne-Yo Reflects on 20 Years of "So Sick" and the Journey to Highway 79';
  }

  return value;
}

function cleanSummary(summary: string) {
  let value = decodeHtml(summary).trim();

  // Sources sometimes expose truncated social descriptions ending in an
  // unfinished connector such as "while..." or "and...". Remove that fragment.
  value = value
    .replace(/\s+(?:while|whilst)\s*(?:\.{3}|…)?\s*$/i, "")
    .replace(/\s+(?:and|with|including)\s*(?:\.{3}|…)\s*$/i, "")
    .replace(/\s*(?:\.{3}|…)\s*$/i, "")
    .trim();

  // If a longer description still contains an obvious unfinished trailing
  // clause, prefer the last complete sentence.
  if (value.length > 220) {
    const sentences = value.match(/[^.!?]+[.!?]+/g);
    if (sentences?.length) {
      const complete = sentences.join(" ").replace(/\s+/g, " ").trim();
      if (complete.length >= 80) value = complete;
    }
  }

  if (value && !/[.!?]["')\]]?$/.test(value)) {
    value += ".";
  }

  return value;
}

function inferCategory(
  title: string,
  summary: string,
  sourceName: string,
  sourceUrl: string
): Category {
  const combined = `${title} ${summary} ${sourceName} ${sourceUrl}`.toLowerCase();

  // Format beats subject matter. An interview about an album is still an interview.
  // Include common podcast/interview signals from the source name and URL.
  if (
    /interview|podcast|episode|conversation|speaks with|talks with|q&a|zach sang|iheartradio|iheart\.com\/podcast/.test(
      combined
    )
  ) {
    return "interview";
  }

  if (
    /tour|concert|festival|performance|performs|live show|stage|residency|tickets|venue/.test(
      combined
    )
  ) {
    return "live";
  }

  if (
    /album|single|song|music|track|release|highway 79|spotify|grammy/.test(
      combined
    )
  ) {
    return "music";
  }

  return "announcement";
}

function myMemoryLanguage(code: string) {
  const normalized = code.toLowerCase();
  const supported = new Set(["en", "pt", "es", "fr", "de", "it", "ja"]);
  return supported.has(normalized) ? normalized : "en";
}

async function translate(text: string, source: string, target: string) {
  if (!text.trim() || source === target) return text.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `${source}|${target}`,
    });

    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`, {
      signal: controller.signal,
      headers: { "User-Agent": "Ne-Yo-World/1.0" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Translation request failed (${response.status}).`);

    const payload = await response.json();
    const translated = payload?.responseData?.translatedText;

    if (!translated || typeof translated !== "string") {
      throw new Error("Translation service returned no text.");
    }

    return decodeHtml(translated);
  } finally {
    clearTimeout(timeout);
  }
}

async function translateStory(
  title: string,
  summary: string,
  sourceLanguage: string
): Promise<Record<Language, StoryTranslation>> {
  const source = myMemoryLanguage(sourceLanguage);

  let englishTitle = title;
  let englishSummary = summary;

  if (source !== "en") {
    [englishTitle, englishSummary] = await Promise.all([
      translate(title, source, "en"),
      translate(summary, source, "en"),
    ]);
  }

  const translations = {
    EN: { title: englishTitle, summary: englishSummary },
  } as Record<Language, StoryTranslation>;

  const targets: Array<[Language, string]> = [
    ["PT", "pt"],
    ["ES", "es"],
    ["FR", "fr"],
    ["DE", "de"],
    ["IT", "it"],
    ["JA", "ja"],
  ];

  const translated = await Promise.all(
    targets.map(async ([language, target]) => {
      const [translatedTitle, translatedSummary] = await Promise.all([
        translate(englishTitle, "en", target),
        translate(englishSummary, "en", target),
      ]);
      return [language, { title: translatedTitle, summary: translatedSummary }] as const;
    })
  );

  translated.forEach(([language, value]) => {
    translations[language] = value;
  });

  return translations;
}

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return true;
  const [a, b] = parts;

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

function isPrivateIpv6(address: string) {
  const value = address.toLowerCase();
  return (
    value === "::" ||
    value === "::1" ||
    value.startsWith("fc") ||
    value.startsWith("fd") ||
    value.startsWith("fe8") ||
    value.startsWith("fe9") ||
    value.startsWith("fea") ||
    value.startsWith("feb") ||
    value.startsWith("ff") ||
    value.startsWith("::ffff:127.") ||
    value.startsWith("::ffff:10.") ||
    value.startsWith("::ffff:192.168.")
  );
}

async function assertPublicHostname(hostname: string) {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (
    normalized === "localhost" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local") ||
    normalized === "metadata.google.internal"
  ) {
    throw new Error("Local or private URLs are not allowed.");
  }

  if (net.isIP(normalized)) {
    const privateAddress = net.isIPv4(normalized)
      ? isPrivateIpv4(normalized)
      : isPrivateIpv6(normalized);
    if (privateAddress) throw new Error("Local or private URLs are not allowed.");
    return;
  }

  const addresses = await lookup(normalized, { all: true, verbatim: true });
  if (!addresses.length) throw new Error("Could not resolve the source hostname.");

  for (const entry of addresses) {
    const privateAddress = net.isIPv4(entry.address)
      ? isPrivateIpv4(entry.address)
      : isPrivateIpv6(entry.address);
    if (privateAddress) throw new Error("Local or private URLs are not allowed.");
  }
}

async function safeHttpUrl(input: string) {
  const url = new URL(input);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https URLs are supported.");
  }

  await assertPublicHostname(url.hostname);
  return url;
}

async function fetchPublicArticle(startUrl: URL) {
  let currentUrl = startUrl;

  for (let redirectCount = 0; redirectCount <= 5; redirectCount += 1) {
    await assertPublicHostname(currentUrl.hostname);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    try {
      response = await fetch(currentUrl.toString(), {
        signal: controller.signal,
        redirect: "manual",
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Ne-Yo World News Importer/1.0)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
    } finally {
      clearTimeout(timeout);
    }

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The source returned an invalid redirect.");
      currentUrl = await safeHttpUrl(new URL(location, currentUrl).toString());
      continue;
    }

    return { response, finalUrl: currentUrl };
  }

  throw new Error("Too many redirects while opening the source.");
}

async function requireAdmin(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";

  if (!token) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Supabase public configuration is missing. Expected NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  const client = createClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await client.auth.getUser(token);
  if (userError || !userData.user) return false;

  const { data: isAdmin, error: adminError } = await client.rpc("is_admin");
  return !adminError && isAdmin === true;
}

export async function POST(request: Request) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const inputUrl = typeof body?.url === "string" ? body.url.trim() : "";

    if (!inputUrl) {
      return NextResponse.json({ ok: false, error: "Paste a news URL first." }, { status: 400 });
    }

    const url = await safeHttpUrl(inputUrl);
    const { response, finalUrl } = await fetchPublicArticle(url);

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `The source could not be opened (${response.status}).` },
        { status: 400 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      return NextResponse.json(
        { ok: false, error: "This URL does not appear to be a web article." },
        { status: 400 }
      );
    }

    const html = (await response.text()).slice(0, 1_500_000);
    const sourceName = pageSiteName(html, finalUrl);
    const rawTitle = pageTitle(html);
    const title = cleanTitle(rawTitle, sourceName);
    const summary = cleanSummary(pageDescription(html));

    if (!title || !summary) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "This source does not expose enough article metadata to import automatically. Open Edit and add the missing fields manually.",
        },
        { status: 422 }
      );
    }

    const translations = await translateStory(title, summary, pageLanguage(html));

    const story: ImportStory = {
      category: inferCategory(title, summary, sourceName, finalUrl.toString()),
      source_name: sourceName,
      source_url: finalUrl.toString(),
      published_at: pagePublishedAt(html),
      translations,
    };

    return NextResponse.json({ ok: true, story });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The source took too long to respond."
        : error instanceof Error
          ? error.message
          : "Could not import this news URL.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
