import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Kategoria',
  type: 'document',
  groups: [
    { name: 'basic', title: '📁 Podstawowe' },
    { name: 'seo',   title: '🔍 SEO' },
  ],
  fields: [
    defineField({ group: 'basic', name: 'name',        title: 'Nazwa kategorii',              type: 'string', validation: R => R.required() }),
    defineField({ group: 'basic', name: 'slug',        title: 'Slug URL',                     type: 'slug',   options: { source: 'name', maxLength: 96 }, validation: R => R.required() }),
    defineField({ group: 'basic', name: 'icon',        title: 'Ikona (emoji lub kod)',         type: 'string' }),
    defineField({ group: 'basic', name: 'image',       title: 'Zdjęcie kategorii',            type: 'image',  options: { hotspot: true } }),
    defineField({ group: 'basic', name: 'description', title: 'Krótki opis (widoczny na stronie)', type: 'text', rows: 3 }),
    defineField({
      group: 'basic', name: 'parent',
      title: 'Kategoria nadrzędna (jeśli podkategoria)',
      type: 'reference',
      to: [{ type: 'category' }],
      options: { disableNew: true },
    }),
    defineField({ group: 'basic', name: 'order',    title: 'Kolejność wyświetlania (0 = pierwsza)', type: 'number', initialValue: 0 }),
    defineField({ group: 'basic', name: 'featured', title: 'Wyróżniona na stronie głównej?',        type: 'boolean', initialValue: false }),

    defineField({ group: 'seo', name: 'seoTitle',       title: 'Tytuł SEO kategorii (np. Tynki elewacyjne Lublin – Media Bud)', type: 'string', validation: R => R.max(70) }),
    defineField({ group: 'seo', name: 'seoDescription', title: 'Meta Description (max 160 znaków)',                              type: 'text',   rows: 3, validation: R => R.max(160) }),
    defineField({ group: 'seo', name: 'seoText',        title: 'Tekst SEO pod produktami (dłuższy opis dla Google)',             type: 'text',   rows: 6 }),
  ],
  orderings: [
    { title: 'Kolejność', name: 'orderAsc',  by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Nazwa A–Z', name: 'nameAsc',   by: [{ field: 'name',  direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', media: 'image', subtitle: 'parent.name' },
  },
})
