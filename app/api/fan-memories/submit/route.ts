import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseBuffer } from "music-metadata";
import crypto from "node:crypto";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 60;
const MAX_IMAGES = 5;
const MAX_STORY = 1500;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

function json(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function extFor(type: string) {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/webm": "webm",
  };
  return map[type] || "bin";
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

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json("Invalid form data.");
  }

  // Honeypot: real users never fill this.
  if (clean(form.get("website"))) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const displayName = clean(form.get("display_name"));
  const countryCode = clean(form.get("country_code")).toUpperCase();
  const originalLanguage = clean(form.get("original_language")).toLowerCase();
  const story = clean(form.get("story"));
  const memoryDate = clean(form.get("memory_date")) || null;
  const consent = clean(form.get("consent"));

  if (consent !== "yes") return json("Consent is required.");
  if (!displayName || displayName.length > 80) return json("Invalid name.");
  if (!/^[A-Z]{2}$/.test(countryCode)) return json("Invalid country.");
  if (!/^[a-z]{2}(-[a-z]{2})?$/.test(originalLanguage)) return json("Invalid language.");
  if (story.length < 10 || story.length > MAX_STORY) return json("Story must contain between 10 and 1500 characters.");
  if (memoryDate && !/^\d{4}-\d{2}-\d{2}$/.test(memoryDate)) return json("Invalid memory date.");

  const files = form.getAll("media").filter((v): v is File => v instanceof File && v.size > 0);
  if (files.length > MAX_IMAGES) return json("Too many files.");

  const images = files.filter((f) => IMAGE_TYPES.has(f.type));
  const videos = files.filter((f) => VIDEO_TYPES.has(f.type));

  if (images.length + videos.length !== files.length) return json("Unsupported media format.");
  if (videos.length > 1) return json("Only one video is allowed.");
  if (videos.length && images.length) return json("Choose photos or one video, not both.");
  if (images.length > MAX_IMAGES) return json("A maximum of 5 photos is allowed.");

  for (const file of images) {
    if (file.size > MAX_IMAGE_BYTES) return json("Each photo must be 10 MB or smaller.");
  }
  for (const file of videos) {
    if (file.size > MAX_VIDEO_BYTES) return json("Video must be 25 MB or smaller.");
  }

  // Server-side duration validation. We do not trust browser-provided duration.
  let videoDuration: number | null = null;
  if (videos[0]) {
    try {
      const bytes = Buffer.from(await videos[0].arrayBuffer());
      const metadata = await parseBuffer(bytes, { mimeType: videos[0].type, size: videos[0].size }, { duration: true });
      videoDuration = metadata.format.duration ?? null;
    } catch {
      return json("The video could not be validated.");
    }

    if (!videoDuration || !Number.isFinite(videoDuration) || videoDuration <= 0) {
      return json("The video duration could not be detected.");
    }
    if (videoDuration > MAX_VIDEO_SECONDS + 0.05) {
      return json("Video must be 60 seconds or shorter.");
    }
  }

  const { data: memory, error: memoryError } = await admin
    .from("fan_memories")
    .insert({
      display_name: displayName,
      country_code: countryCode,
      original_language: originalLanguage,
      story,
      memory_date: memoryDate,
      status: "pending",
    })
    .select("id")
    .single();

  if (memoryError || !memory) {
    console.error("Fan Memory insert failed:", memoryError);
    return json("The memory could not be submitted.", 500);
  }

  const uploaded: Array<{ bucket: string; path: string }> = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = VIDEO_TYPES.has(file.type);
      const bucket = isVideo ? "fan-memory-videos" : "fan-memory-images";
      const path = `${memory.id}/${crypto.randomUUID()}.${extFor(file.type)}`;
      const bytes = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await admin.storage
        .from(bucket)
        .upload(path, bytes, {
          contentType: file.type,
          upsert: false,
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;
      uploaded.push({ bucket, path });

      const { error: mediaError } = await admin.from("fan_memory_media").insert({
        memory_id: memory.id,
        media_type: isVideo ? "video" : "image",
        storage_bucket: bucket,
        storage_path: path,
        mime_type: file.type,
        file_size_bytes: file.size,
        duration_seconds: isVideo ? videoDuration : null,
        display_order: i + 1,
      });

      if (mediaError) throw mediaError;
    }

    return NextResponse.json({ ok: true, id: memory.id }, { status: 201 });
  } catch (error) {
    console.error("Fan Memory media upload failed:", error);

    for (const item of uploaded) {
      await admin.storage.from(item.bucket).remove([item.path]);
    }
    await admin.from("fan_memories").delete().eq("id", memory.id);

    return json("The media upload failed. Nothing was published.", 500);
  }
}
