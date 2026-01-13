import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'collection', 'basePrice', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Artwork Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly name (e.g., "gemsbok-in-the-mist")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Full Description',
    },
    {
      name: 'collection',
      type: 'relationship',
      relationTo: 'collections',
      required: true,
      label: 'Collection',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'edition',
      type: 'group',
      label: 'Edition Details',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Limited Edition', value: 'limited' },
            { label: 'Open Edition', value: 'open' },
            { label: 'Artist Proof', value: 'ap' },
          ],
          defaultValue: 'limited',
          required: true,
        },
        {
          name: 'total',
          type: 'number',
          label: 'Edition Size',
          min: 1,
          admin: {
            description: 'Total number in edition (e.g., 150)',
            condition: (_data, siblingData) => siblingData?.type === 'limited',
          },
        },
        {
          name: 'sold',
          type: 'number',
          label: 'Number Sold',
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'sizes',
      type: 'array',
      label: 'Available Sizes',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Size Name',
          admin: {
            description: 'e.g., "Medium", "Large", "Masterwork"',
          },
        },
        {
          name: 'dimensions',
          type: 'text',
          required: true,
          label: 'Dimensions',
          admin: {
            description: 'e.g., \'40" x 30"\'',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Price (USD)',
        },
      ],
    },
    {
      name: 'details',
      type: 'array',
      label: 'Product Details',
      admin: {
        description: 'Features included with purchase',
      },
      fields: [
        {
          name: 'detail',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Product',
      admin: {
        description: 'Show on homepage featured works carousel',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Sold Out', value: 'sold_out' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
}
