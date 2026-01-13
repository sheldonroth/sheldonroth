import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return await getPayload({ config })
}

// Get all collections
export async function getCollections() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'collections',
    where: {
      status: { equals: 'published' },
    },
    sort: 'order',
  })
  return docs
}

// Get single collection by slug
export async function getCollectionBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'collections',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

// Get all products
export async function getProducts(options?: {
  collection?: string
  featured?: boolean
  limit?: number
}) {
  const payload = await getPayloadClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [{ status: { equals: 'published' } }]

  if (options?.collection) {
    conditions.push({ 'collection.slug': { equals: options.collection } })
  }

  if (options?.featured) {
    conditions.push({ featured: { equals: true } })
  }

  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: conditions,
    },
    limit: options?.limit || 100,
    sort: '-createdAt',
  })

  return docs
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

// Get featured products for homepage
export async function getFeaturedProducts(limit = 10) {
  return getProducts({ featured: true, limit })
}

// Re-export utility functions for backward compatibility
export { getImageUrl, formatPrice } from './utils'
