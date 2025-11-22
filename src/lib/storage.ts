// src/lib/storage.ts
import supabase from "./supabaseClient";

const DEFAULT_BUCKET = "banners"; // change to your bucket

export async function getPublicUrl(path?: string | null, bucket = DEFAULT_BUCKET) {
  if (!path) return "";
  // if path already contains a full url, return it:
  if (/^https?:\/\//i.test(path)) return path;

  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    // data.publicUrl is the v2 shape; check console if different in your SDK version
    return data?.publicUrl ?? "";
  } catch (err) {
    console.error("getPublicUrl error:", err);
    return "";
  }
}