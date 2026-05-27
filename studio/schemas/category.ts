import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Kategoria',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nazwa', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug URL', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: R => R.required() }),
    defineField({ name: 'icon', title: 'Ikona (emoji lub litery)', type: 'string' }),
    defineField({ name: 'image', title: 'Zdjęcie kategorii', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Opis kategorii', type: 'text', rows: 3 }),
    defineField({
      name: 'parent',
      title: 'Kategoria nadrzędna',
      type: 'reference',
      to: [{ type: 'category' }],
      options: { disableNew: true },
    }),
    defineField({ name: 'order', title: 'Kolejność wyświetlania', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'name', media: 'image', subtitle: 'parent.name' },
  },
})
