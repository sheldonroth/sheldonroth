// Utility functions that can be used on both client and server

// Helper to get image URL from media
export function getImageUrl(media: unknown): string {
  if (!media) return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'

  if (typeof media === 'string') {
    // If it's a localhost URL, extract just the path
    if (media.includes('localhost')) {
      try {
        const url = new URL(media)
        return url.pathname
      } catch {
        return media
      }
    }
    return media
  }

  if (typeof media === 'object' && media !== null) {
    const mediaObj = media as { url?: string; filename?: string }
    if (mediaObj.url) {
      // If it's a localhost URL, extract just the path
      if (mediaObj.url.includes('localhost')) {
        try {
          const url = new URL(mediaObj.url)
          return url.pathname
        } catch {
          return mediaObj.url
        }
      }
      return mediaObj.url
    }
    if (mediaObj.filename) return `/api/media/file/${mediaObj.filename}`
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
