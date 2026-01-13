import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { sql } from '@payloadcms/db-postgres'

export async function GET() {
  try {
    const payload = await getPayloadClient()

    // Access the db adapter - payload.db has the drizzle instance
    const db = (payload.db as { drizzle: { execute: (sql: unknown) => Promise<unknown> } }).drizzle

    // Run the migration to make image_id nullable
    await db.execute(sql`
      ALTER TABLE "collections" ALTER COLUMN "image_id" DROP NOT NULL;
    `)

    return NextResponse.json({
      success: true,
      message: 'Migration completed: image_id is now nullable in collections table'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}
