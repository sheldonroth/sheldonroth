import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import * as fs from 'fs'
import * as path from 'path'

// Product definitions with collection assignments
const productDefinitions = [
  // Seascape
  { filename: 'shipwreck-at-dawn.jpg', title: 'Shipwreck at Dawn', collection: 'seascape', price: 520, description: 'A haunting silhouette of a beached vessel emerges from golden morning light, where the boundary between sea and sky dissolves into ethereal mist.' },
  { filename: 'pacific-edge.jpg', title: 'Pacific Edge', collection: 'seascape', price: 680, description: 'Dramatic coastal cliffs meet the relentless Pacific Ocean in this powerful composition capturing the raw energy of the western shoreline.' },
  { filename: 'turquoise-depths.jpg', title: 'Turquoise Depths', collection: 'seascape', price: 550, description: 'Crystal-clear tropical waters reveal layers of mesmerizing turquoise, inviting viewers into an underwater world of serene beauty.' },
  { filename: 'coral-symphony.jpg', title: 'Coral Symphony', collection: 'seascape', price: 480, description: 'Vibrant coral formations create a natural symphony of color and texture beneath the waves, a celebration of marine biodiversity.' },
  { filename: 'island-paradise.jpg', title: 'Island Paradise', collection: 'seascape', price: 580, description: 'A pristine tropical island floats between azure sky and turquoise sea, embodying the essence of paradise untouched by time.' },

  // Landscape
  { filename: 'mountain-majesty.jpg', title: 'Mountain Majesty', collection: 'landscape', price: 750, description: 'Snow-capped peaks pierce through a sea of clouds in this majestic alpine vista, capturing the timeless grandeur of mountain wilderness.' },
  { filename: 'tropical-sunset.jpg', title: 'Tropical Sunset', collection: 'landscape', price: 520, description: 'The sky ignites in brilliant oranges and purples as the sun descends over a tropical paradise, painting the world in warm farewell.' },

  // Architecture
  { filename: 'city-lights.jpg', title: 'City Lights', collection: 'architecture', price: 620, description: 'The urban skyline transforms into a constellation of illuminated windows and streets, revealing the pulsing heartbeat of the city at night.' },
  { filename: 'urban-rainbow.jpg', title: 'Urban Rainbow', collection: 'architecture', price: 580, description: 'A rare natural phenomenon arcs over the urban landscape, connecting steel and glass towers with a bridge of prismatic light.' },
  { filename: 'density.jpg', title: 'Density', collection: 'architecture', price: 550, description: 'Towering residential blocks create a mesmerizing pattern of windows and balconies, a testament to human ingenuity in vertical living.' },
  { filename: 'empire.jpg', title: 'Empire', collection: 'architecture', price: 680, description: 'An iconic architectural marvel reaches toward the heavens, its art deco spire a symbol of ambition and artistic excellence.' },

  // Wildlife
  { filename: 'king-of-the-savanna.jpg', title: 'King of the Savanna', collection: 'wildlife', price: 720, description: 'A magnificent lion surveys his domain with regal composure, his amber eyes reflecting centuries of evolutionary perfection.' },
  { filename: 'golden-mane.jpg', title: 'Golden Mane', collection: 'wildlife', price: 650, description: 'Sunlight catches the flowing mane of the savanna\'s apex predator, creating a portrait of wild beauty and untamed power.' },
  { filename: 'migration.jpg', title: 'Migration', collection: 'wildlife', price: 580, description: 'Thousands move as one across the endless plains in nature\'s greatest spectacle, an annual journey of survival and renewal.' },
  { filename: 'solitude.jpg', title: 'Solitude', collection: 'wildlife', price: 520, description: 'A lone figure stands against the vast African landscape, a moment of quiet contemplation in the wild.' },

  // Nature
  { filename: 'bark-patterns.jpg', title: 'Bark Patterns', collection: 'nature', price: 450, description: 'Ancient tree bark reveals intricate patterns carved by time and weather, nature\'s own abstract masterpiece.' },
  { filename: 'white-birch.jpg', title: 'White Birch', collection: 'nature', price: 480, description: 'Elegant white birch trunks create a striking natural rhythm, their papery bark glowing in soft forest light.' },

  // Abstract
  { filename: 'light-dance.jpg', title: 'Light Dance', collection: 'abstract', price: 420, description: 'Captured light weaves through space in an ethereal dance of color and form, blurring the line between photography and painting.' },
]

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []
    const photosDir = '/Users/sheldonroth/Documents/sheldonroth/cms-photos'

    // First, get all collections to map slugs to IDs
    const collectionsResult = await payload.find({
      collection: 'collections',
      limit: 100,
    })

    const collectionMap: Record<string, number> = {}
    for (const col of collectionsResult.docs) {
      collectionMap[col.slug] = col.id
    }

    results.push(`Found ${collectionsResult.docs.length} collections: ${Object.keys(collectionMap).join(', ')}`)

    // Process each product
    for (const product of productDefinitions) {
      try {
        const filePath = path.join(photosDir, product.filename)

        // Check if file exists
        if (!fs.existsSync(filePath)) {
          results.push(`File not found: ${product.filename}`)
          continue
        }

        // Check if product already exists
        const existingProduct = await payload.find({
          collection: 'products',
          where: { slug: { equals: product.title.toLowerCase().replace(/\s+/g, '-') } },
          limit: 1,
        })

        if (existingProduct.docs.length > 0) {
          results.push(`Product "${product.title}" already exists, skipping...`)
          continue
        }

        // Read file and create media
        const fileBuffer = fs.readFileSync(filePath)
        const stats = fs.statSync(filePath)

        // Create media document
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: product.title,
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/jpeg',
            name: product.filename,
            size: stats.size,
          },
        })

        results.push(`Created media: ${product.filename} (ID: ${media.id})`)

        // Get collection ID
        const collectionId = collectionMap[product.collection]
        if (!collectionId) {
          results.push(`Collection not found for "${product.collection}", skipping product creation`)
          continue
        }

        // Create product
        const newProduct = await payload.create({
          collection: 'products',
          data: {
            title: product.title,
            slug: product.title.toLowerCase().replace(/\s+/g, '-'),
            description: product.description,
            collection: collectionId,
            images: [{ image: media.id }],
            sizes: [
              { name: 'Small', dimensions: '16" x 20"', price: product.price },
              { name: 'Medium', dimensions: '24" x 30"', price: Math.round(product.price * 1.5) },
              { name: 'Large', dimensions: '36" x 48"', price: Math.round(product.price * 2.2) },
            ],
            details: [
              { detail: 'Museum-quality archival pigment print' },
              { detail: 'Printed on Hahnemühle Photo Rag 308gsm' },
              { detail: 'Limited edition of 50' },
              { detail: 'Hand-signed and numbered by the artist' },
              { detail: 'Certificate of authenticity included' },
            ],
            edition: {
              type: 'limited',
              total: 50,
              sold: 0,
            },
            featured: false,
            status: 'published',
          },
        })

        results.push(`Created product: ${product.title} (ID: ${newProduct.id})`)

      } catch (error) {
        results.push(`Error processing ${product.filename}: ${error}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
