import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MediaRow = {
  id: string;
  memory_id: string;
  media_type: "image" | "video";
  storage_bucket: string;
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  duration_seconds: number | null;
  display_order: number;
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Server configuration is incomplete." },
      { status: 500 }
    );
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: memories, error: memoriesError } = await admin
    .from("fan_memories")
    .select(`
      id,
      display_name,
      country_code,
      original_language,
      story,
      memory_date,
      created_at
    `)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (memoriesError) {
    console.error("Fan Memories public fetch failed:", memoriesError);
    return NextResponse.json(
      { error: "Fan Memories could not be loaded." },
      { status: 500 }
    );
  }

  if (!memories?.length) {
    return NextResponse.json({ memories: [] });
  }

  const ids = memories.map((memory) => memory.id);

  const { data: mediaRows, error: mediaError } = await admin
    .from("fan_memory_media")
    .select(`
      id,
      memory_id,
      media_type,
      storage_bucket,
      storage_path,
      mime_type,
      file_size_bytes,
      duration_seconds,
      display_order
    `)
    .in("memory_id", ids)
    .order("display_order", { ascending: true });

  if (mediaError) {
    console.error("Fan Memories media fetch failed:", mediaError);
    return NextResponse.json(
      { error: "Fan Memories media could not be loaded." },
      { status: 500 }
    );
  }

  const safeMedia: Record<string, any[]> = {};

  for (const row of (mediaRows || []) as MediaRow[]) {
    const { data, error } = await admin.storage
      .from(row.storage_bucket)
      .createSignedUrl(row.storage_path, 60 * 60);

    if (error || !data?.signedUrl) {
      console.error("Fan Memory signed URL failed:", {
        id: row.id,
        error,
      });
      continue;
    }

    if (!safeMedia[row.memory_id]) safeMedia[row.memory_id] = [];

    safeMedia[row.memory_id].push({
      id: row.id,
      media_type: row.media_type,
      mime_type: row.mime_type,
      file_size_bytes: row.file_size_bytes,
      duration_seconds: row.duration_seconds,
      display_order: row.display_order,
      url: data.signedUrl,
    });
  }

  const payload = memories.map((memory) => ({
    ...memory,
    media: safeMedia[memory.id] || [],
  }));

  return NextResponse.json(
    { memories: payload },
    {
      headers: {
        "Cache-Control": "private, max-age=0, no-store",
      },
    }
  );
}
