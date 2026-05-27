import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Ustawienia witryny',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nazwa firmy', type: 'string', initialValue: 'Media Bud' }),
    defineField({ name: 'tagline', title: 'Slogan', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string', initialValue: '+48 509 567 213' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string', initialValue: 'sprzedaz@mediabud.pl' }),
    defineField({ name: 'address', title: 'Adres', type: 'text', rows: 2 }),
    defineField({ name: 'nip', title: 'NIP', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ogImage', title: 'OG Image (social share)', type: 'image' }),
    defineField({
      name: 'socials',
      title: 'Media społecznościowe',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
    defineField({ name: 'metaTitle', title: 'Domyślny Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Domyślny Meta Description', type: 'text', rows: 2 }),
  ],
})
