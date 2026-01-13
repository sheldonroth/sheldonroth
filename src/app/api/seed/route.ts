import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collections: any[] = [
  {
    title: 'Seascape',
    slug: 'seascape',
    description: 'Ocean and coastal photography capturing the power and beauty of the sea',
    order: 1,
    status: 'published' as const,
  },
  {
    title: 'Landscape',
    slug: 'landscape',
    description: 'Majestic mountains, sweeping vistas, and natural wonders from around the world',
    order: 2,
    status: 'published' as const,
  },
  {
    title: 'Architecture',
    slug: 'architecture',
    description: 'Urban geometry and architectural marvels celebrating human design',
    order: 3,
    status: 'published' as const,
  },
  {
    title: 'Wildlife',
    slug: 'wildlife',
    description: 'Intimate portraits of animals in their natural habitats',
    order: 4,
    status: 'published' as const,
  },
  {
    title: 'Nature',
    slug: 'nature',
    description: 'Abstract patterns and textures found in the natural world',
    order: 5,
    status: 'published' as const,
  },
  {
    title: 'Abstract',
    slug: 'abstract',
    description: 'Experimental photography exploring light, form, and movement',
    order: 6,
    status: 'published' as const,
  },
]

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    // Create collections
    for (const collection of collections) {
      try {
        // Check if collection already exists
        const existing = await payload.find({
          collection: 'collections',
          where: { slug: { equals: collection.slug } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          results.push(`Collection "${collection.title}" already exists, skipping...`)
          continue
        }

        await payload.create({
          collection: 'collections',
          data: collection,
        })
        results.push(`Created collection: ${collection.title}`)
      } catch (error) {
        results.push(`Error creating ${collection.title}: ${error}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
