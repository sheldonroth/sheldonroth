// Utility functions that can be used on both client and server

const BLOB_BASE_URL = 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com'

// Helper to get image URL from media
// Vercel Blob storage adds hash suffixes to filenames, so we prefer the full URL
// over constructing from filename (which would miss the hash)
export function getImageUrl(media: unknown): string {
  if (!media) return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'

  if (typeof media === 'string') {
    // If it's a localhost URL, we can't convert without knowing the hash
    // Return as-is and hope it works (dev environment)
    return media
  }

  if (typeof media === 'object' && media !== null) {
    const mediaObj = media as { url?: string; filename?: string }

    // Prefer url since it contains the full path with Vercel Blob hash suffix
    if (mediaObj.url) {
      // If it's not a localhost URL, use it directly
      if (!mediaObj.url.includes('localhost')) {
        return mediaObj.url
      }
      // For localhost URLs in dev, still return them (will work locally)
      return mediaObj.url
    }

    // Fallback: construct from filename (won't have hash, may not work in prod)
    if (mediaObj.filename) {
      return `${BLOB_BASE_URL}/media/${mediaObj.filename}`
    }
  }

  return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
}

// Format price for display
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
