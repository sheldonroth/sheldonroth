import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import * as fs from 'fs'
import * as path from 'path'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []
    const photosDir = '/Users/sheldonroth/Documents/sheldonroth/cms-photos'

    // Step 1: Get all products and clear their images
    const products = await payload.find({
      collection: 'products',
      limit: 100,
    })

    results.push(`Found ${products.docs.length} products`)

    for (const prod of products.docs) {
      await payload.update({
        collection: 'products',
        id: prod.id as number,
        data: {
          images: [],
        },
      })
      results.push(`Cleared images from: ${prod.title}`)
    }

    // Step 2: Delete all existing media
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 100,
    })

    results.push(`Found ${existingMedia.docs.length} existing media items`)

    for (const media of existingMedia.docs) {
      await payload.delete({
        collection: 'media',
        id: media.id,
      })
      results.push(`Deleted media: ${media.id}`)
    }

    // Step 3: Re-upload all images to Vercel Blob
    const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.jpg'))
    results.push(`Found ${files.length} files to upload`)

    for (const filename of files) {
      try {
        const filePath = path.join(photosDir, filename)
        const fileBuffer = fs.readFileSync(filePath)
        const stats = fs.statSync(filePath)

        // Get title from filename
        const title = filename.replace('.jpg', '').split('-').map(
          word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')

        // Create media document - this will upload to Vercel Blob
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: title,
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/jpeg',
            name: filename,
            size: stats.size,
          },
        })

        results.push(`Uploaded: ${filename} -> ${media.url || 'no url'}`)

        // Find and update the corresponding product
        const slug = filename.replace('.jpg', '')
        const matchingProduct = products.docs.find(p => p.slug === slug)

        if (matchingProduct) {
          await payload.update({
            collection: 'products',
            id: matchingProduct.id as number,
            data: {
              images: [{ image: media.id }],
            },
          })
          results.push(`Updated product: ${matchingProduct.title} with media ${media.id}`)
        } else {
          results.push(`No matching product for: ${slug}`)
        }

      } catch (error) {
        results.push(`Error uploading ${filename}: ${error}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
