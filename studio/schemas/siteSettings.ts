import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Ustawienia witryny',
  type: 'document',
  groups: [
    { name: 'firma',   title: '🏢 Dane firmy' },
    { name: 'kontakt', title: '📞 Kontakt i godziny' },
    { name: 'seo',     title: '🔍 SEO globalne' },
    { name: 'social',  title: '📱 Social media' },
  ],
  fields: [
    /* ── FIRMA ── */
    defineField({ group: 'firma', name: 'siteName',  title: 'Nazwa firmy',   type: 'string', initialValue: 'Media Bud' }),
    defineField({ group: 'firma', name: 'tagline',   title: 'Slogan firmy',  type: 'string', initialValue: 'Skład budowlany i usługi wykonawcze' }),
    defineField({ group: 'firma', name: 'nip',       title: 'NIP',           type: 'string', initialValue: '9462743421' }),
    defineField({ group: 'firma', name: 'logo',      title: 'Logo firmy',    type: 'image',  options: { hotspot: true } }),
    defineField({ group: 'firma', name: 'ogImage',   title: 'OG Image (podgląd w social media, 1200×630)', type: 'image' }),

    /* ── KONTAKT ── */
    defineField({ group: 'kontakt', name: 'phone',   title: 'Telefon główny',  type: 'string', initialValue: '+48 533 553 344' }),
    defineField({ group: 'kontakt', name: 'email',   title: 'E-mail',          type: 'string', initialValue: 'sprzedaz@mediabud.pl' }),
    defineField({ group: 'kontakt', name: 'address', title: 'Adres',           type: 'text',   rows: 2, initialValue: 'ul. Chemiczna 8d\n20-329 Lublin' }),
    defineField({ group: 'kontakt', name: 'googleMapsUrl', title: 'Link do Google Maps', type: 'url', initialValue: 'https://www.google.com/maps/search/?api=1&query=51.2375,22.6016' }),

    defineField({
      group: 'kontakt', name: 'openingHours', title: 'Godziny otwarcia',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'Pon–Pt',  type: 'string', initialValue: '7:00–16:00' },
        { name: 'saturday', title: 'Sobota',  type: 'string', initialValue: '7:00–13:00' },
        { name: 'sunday',   title: 'Niedziela', type: 'string', initialValue: 'Zamknięte' },
      ],
    }),

    /* ── SEO ── */
    defineField({ group: 'seo', name: 'metaTitle',       title: 'Domyślny Meta Title (SEO)',        type: 'string', validation: R => R.max(70) }),
    defineField({ group: 'seo', name: 'metaDescription', title: 'Domyślny Meta Description (SEO)', type: 'text',   rows: 2, validation: R => R.max(160) }),

    /* ── SOCIAL ── */
    defineField({
      group: 'social', name: 'socials', title: 'Media społecznościowe',
      type: 'object',
      fields: [
        { name: 'facebook',  title: 'Facebook URL',  type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube',   title: 'YouTube URL',   type: 'url' },
      ],
    }),
  ],
})
