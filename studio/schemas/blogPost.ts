import { defineType, defineField } from 'sanity'

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Artykuł bloga',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug URL', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() }),
    defineField({ name: 'excerpt', title: 'Fragment / zajawka', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Zdjęcie główne', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'content',
      title: 'Treść artykułu',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'publishedAt', title: 'Data publikacji', type: 'datetime' }),
    defineField({
      name: 'categories',
      title: 'Kategorie',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'readingTime', title: 'Czas czytania (min)', type: 'number' }),
    defineField({ name: 'metaTitle', title: 'Meta Title (SEO)', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description (SEO)', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Data (najnowsze)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'publishedAt' },
  },
})
