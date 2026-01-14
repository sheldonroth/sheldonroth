import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

const BLOB_BASE_URL = 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    // Get all media
    const allMedia = await payload.find({
      collection: 'media',
      limit: 100,
    })

    results.push(`Found ${allMedia.docs.length} media items`)

    for (const media of allMedia.docs) {
      const filename = media.filename as string
      if (!filename) continue

      const blobUrl = `${BLOB_BASE_URL}/${filename}`

      // Update the media with the correct blob URL
      await payload.update({
        collection: 'media',
        id: media.id as number,
        data: {
          url: blobUrl,
        },
      })

      results.push(`Updated ${filename} -> ${blobUrl}`)
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
