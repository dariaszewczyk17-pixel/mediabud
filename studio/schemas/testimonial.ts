import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Opinia klienta',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Imię i nazwisko',    type: 'string', validation: R => R.required() }),
    defineField({ name: 'role',     title: 'Stanowisko / rola',  type: 'string' }),
    defineField({ name: 'company',  title: 'Firma / kontekst',   type: 'string' }),
    defineField({ name: 'avatar',   title: 'Zdjęcie (opcjonalne)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'rating', title: 'Ocena (1–5 gwiazdek)',
      type: 'number',
      initialValue: 5,
      validation: R => R.required().min(1).max(5).integer(),
    }),
    defineField({ name: 'text',     title: 'Treść opinii',       type: 'text', rows: 5, validation: R => R.required() }),
    defineField({ name: 'tag',      title: 'Tag (np. Dom jednorodzinny)', type: 'string' }),
    defineField({ name: 'featured', title: 'Wyróżniona opinia?', type: 'boolean', initialValue: false }),
    defineField({ name: 'order',    title: 'Kolejność',          type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Kolejność', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
  },
})
