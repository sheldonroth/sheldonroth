// Utility functions that can be used on both client and server

const BLOB_BASE_URL = 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com'

// Helper to get image URL from media
export function getImageUrl(media: unknown): string {
  if (!media) return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'

  if (typeof media === 'string') {
    // If it's a localhost URL, convert to blob URL
    if (media.includes('localhost')) {
      try {
        const url = new URL(media)
        const filename = url.pathname.split('/').pop()
        if (filename) return `${BLOB_BASE_URL}/${filename}`
      } catch {
        return media
      }
    }
    return media
  }

  if (typeof media === 'object' && media !== null) {
    const mediaObj = media as { url?: string; filename?: string }

    // Prefer filename to construct blob URL directly
    if (mediaObj.filename) {
      return `${BLOB_BASE_URL}/${mediaObj.filename}`
    }

    if (mediaObj.url) {
      // If it's a localhost URL, convert to blob URL
      if (mediaObj.url.includes('localhost')) {
        try {
          const url = new URL(mediaObj.url)
          const filename = url.pathname.split('/').pop()
          if (filename) return `${BLOB_BASE_URL}/${filename}`
        } catch {
          return mediaObj.url
        }
      }
      return mediaObj.url
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
