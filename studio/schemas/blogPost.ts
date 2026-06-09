import { defineType, defineField } from 'sanity'

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Artykuł bloga',
  type: 'document',
  groups: [
    { name: 'basic',   title: '📝 Podstawowe' },
    { name: 'content', title: '📄 Treść' },
    { name: 'seo',     title: '🔍 SEO' },
  ],
  fields: [
    defineField({ group: 'basic', name: 'title',       title: 'Tytuł artykułu',           type: 'string',   validation: R => R.required() }),
    defineField({ group: 'basic', name: 'slug',        title: 'Slug URL',                 type: 'slug',     options: { source: 'title', maxLength: 96 }, validation: R => R.required() }),
    defineField({ group: 'basic', name: 'excerpt',     title: 'Zajawka (lead) – 1–2 zdania', type: 'text', rows: 3 }),
    defineField({ group: 'basic', name: 'coverImage',  title: 'Zdjęcie główne',            type: 'image',   options: { hotspot: true } }),
    defineField({ group: 'basic', name: 'publishedAt', title: 'Data publikacji',           type: 'datetime' }),
    defineField({ group: 'basic', name: 'readingTime', title: 'Czas czytania (min)',       type: 'number' }),
    defineField({ group: 'basic', name: 'featured',    title: 'Wyróżniony artykuł?',       type: 'boolean', initialValue: false }),

    defineField({ group: 'basic', name: 'author',      title: 'Autor',                    type: 'string',  initialValue: 'Redakcja Media Bud' }),
    defineField({ group: 'basic', name: 'authorPhoto', title: 'Zdjęcie autora',           type: 'image',   options: { hotspot: true } }),

    defineField({
      group: 'basic', name: 'categories',
      title: 'Kategorie artykułu',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Poradniki budowlane', value: 'poradniki' },
          { title: 'Materiały budowlane', value: 'materialy' },
          { title: 'Elewacje i ocieplenia', value: 'elewacje' },
          { title: 'Dachy', value: 'dachy' },
          { title: 'Aktualności', value: 'aktualnosci' },
          { title: 'Marki', value: 'marki' },
          { title: 'Porady ekspertów', value: 'eksperci' },
        ],
      },
    }),

    defineField({
      group: 'content', name: 'content',
      title: 'Treść artykułu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),

    defineField({ group: 'seo', name: 'metaTitle',       title: 'Meta Title (max 70 znaków)',        type: 'string', validation: R => R.max(70) }),
    defineField({ group: 'seo', name: 'metaDescription', title: 'Meta Description (max 160 znaków)', type: 'text',   rows: 2, validation: R => R.max(160) }),
  ],
  orderings: [
    { title: 'Najnowsze', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Wyróżnione', name: 'featuredFirst',  by: [{ field: 'featured',    direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'publishedAt' },
  },
})
