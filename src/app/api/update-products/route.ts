import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Peter Lik prices ~$3,500-$5,700 for small, $8,000+ for medium, $15,000+ for large
// 30% less pricing structure
const NEW_SIZES = [
  { name: 'Gallery', dimensions: '30" x 20"', price: 2800 },
  { name: 'Signature', dimensions: '45" x 30"', price: 4900 },
  { name: 'Masterwork', dimensions: '60" x 40"', price: 8500 },
]

// Acrylic face mount details
const NEW_DETAILS = [
  { detail: 'TruLife® acrylic face mount with anti-reflective coating' },
  { detail: 'Fujiflex crystal archive print for ultimate clarity' },
  { detail: 'Aluminum backing with French cleat mounting system' },
  { detail: 'Limited edition of 50 worldwide' },
  { detail: 'Hand-signed and numbered by the artist' },
  { detail: 'Certificate of authenticity included' },
]

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    // Get all products
    const products = await payload.find({
      collection: 'products',
      limit: 100,
    })

    results.push(`Found ${products.docs.length} products to update`)

    for (const product of products.docs) {
      await payload.update({
        collection: 'products',
        id: product.id as number,
        data: {
          sizes: NEW_SIZES,
          details: NEW_DETAILS,
        },
      })
      results.push(`Updated: ${product.title}`)
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
