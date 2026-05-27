import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nazwa', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug URL', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: R => R.required() }),
    defineField({ name: 'sku', title: 'SKU / Indeks', type: 'string' }),
    defineField({ name: 'brand', title: 'Marka', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'shortDescription', title: 'Krótki opis', type: 'text', rows: 3 }),
    defineField({
      name: 'description',
      title: 'Pełny opis (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'unit', title: 'Jednostka (np. szt, m², worek)', type: 'string' }),
    defineField({ name: 'priceMin', title: 'Cena od (PLN)', type: 'number' }),
    defineField({ name: 'priceMax', title: 'Cena do (PLN)', type: 'number' }),
    defineField({
      name: 'specs',
      title: 'Dane techniczne',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'key', title: 'Parametr', type: 'string' },
          { name: 'value', title: 'Wartość', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'tags', title: 'Tagi', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'featured', title: 'Wyróżniony?', type: 'boolean', initialValue: false }),
    defineField({ name: 'inStock', title: 'Dostępny w magazynie?', type: 'boolean', initialValue: true }),
    defineField({ name: 'metaTitle', title: 'Meta Title (SEO)', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description (SEO)', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0', subtitle: 'brand' },
  },
})
