import { defineType, defineField } from 'sanity'

export const realizacjaSchema = defineType({
  name: 'realizacja',
  title: 'Realizacja',
  type: 'document',
  groups: [
    { name: 'basic',   title: 'Podstawowe' },
    { name: 'content', title: 'Treść' },
    { name: 'seo',     title: 'SEO' },
  ],
  fields: [
    defineField({ group: 'basic', name: 'title',       title: 'Tytuł projektu',        type: 'string', validation: R => R.required() }),
    defineField({ group: 'basic', name: 'slug',        title: 'Slug URL',              type: 'slug',   options: { source: 'title', maxLength: 96 }, validation: R => R.required() }),
    defineField({ group: 'basic', name: 'projectName', title: 'Nazwa / lokalizacja',   type: 'string' }),
    defineField({ group: 'basic', name: 'client',      title: 'Klient / inwestor',     type: 'string' }),
    defineField({ group: 'basic', name: 'year',        title: 'Rok realizacji',        type: 'string' }),
    defineField({ group: 'basic', name: 'coverImage',  title: 'Zdjęcie główne',        type: 'image',  options: { hotspot: true } }),
    defineField({ group: 'basic', name: 'images',      title: 'Galeria zdjęć',         type: 'array',  of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ group: 'basic', name: 'featured',    title: 'Wyróżniona realizacja?', type: 'boolean', initialValue: false }),
    defineField({
      group: 'basic', name: 'tags', title: 'Tagi (np. ETICS, Tynki, Lublin)',
      type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' },
    }),
    defineField({
      group: 'basic', name: 'category', title: 'Typ realizacji',
      type: 'string',
      options: {
        list: [
          { title: 'Elewacje i ocieplenia', value: 'elewacje' },
          { title: 'Dachy',                 value: 'dachy' },
          { title: 'Wykończenia',           value: 'wykonczenia' },
          { title: 'Budownictwo',           value: 'budownictwo' },
          { title: 'Obiekty komercyjne',    value: 'komercyjne' },
        ],
      },
    }),

    defineField({ group: 'content', name: 'scope',       title: 'Zakres prac',          type: 'text', rows: 4 }),
    defineField({ group: 'content', name: 'description',  title: 'Opis szczegółowy',     type: 'text', rows: 6 }),
    defineField({ group: 'content', name: 'results',      title: 'Efekty / rezultaty',   type: 'text', rows: 3 }),

    defineField({ group: 'seo', name: 'metaTitle',       title: 'Meta Title (SEO)',        type: 'string', validation: R => R.max(70) }),
    defineField({ group: 'seo', name: 'metaDescription', title: 'Meta Description (SEO)', type: 'text',   rows: 2, validation: R => R.max(160) }),
  ],
  orderings: [
    { title: 'Rok (najnowsze)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'year' },
  },
})
