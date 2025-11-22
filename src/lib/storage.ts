// src/lib/storage.ts
import supabase from './supabaseClient'

const KNOWN_BUCKETS = new Set([
  'brands',
  'banners',
  'product-images',
  'artist-gallery',
  'profile-images',
  // add more bucket names here if you create them
])

export const getPublicUrl = (rawPath: string | null, defaultBucket = 'banners') => {
  if (!rawPath) return null

  // If the path already includes bucket as first segment, use it.
  // Example rawPath: "artist-gallery/john.jpg" => bucket='artist-gallery', path='john.jpg'
  let bucket = defaultBucket
  let path = rawPath

  const firstSep = rawPath.indexOf('/')
  if (firstSep > 0) {
    const maybeBucket = rawPath.slice(0, firstSep)
    const remainder = rawPath.slice(firstSep + 1)
    if (KNOWN_BUCKETS.has(maybeBucket)) {
      bucket = maybeBucket
      path = remainder
    }
  }

  const res = supabase.storage.from(bucket).getPublicUrl(path)

  // support both SDK shapes
  const publicUrl =
    (res && (res as any).data && (res as any).data.publicUrl) ||
    (res && (res as any).publicURL) ||
    null

  console.log('[DEBUG getPublicUrl] bucket=', bucket, 'path=', path, '->', publicUrl)
  return publicUrl
}