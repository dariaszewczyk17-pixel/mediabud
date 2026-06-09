import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'mediabud',
  title: 'Media Bud – Panel CMS',
  projectId: 'nzcwegq7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('🏗️  Media Bud')
          .items([

            /* ── USTAWIENIA ── */
            S.listItem()
              .title('⚙️  Ustawienia witryny')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Ustawienia witryny'),
              ),

            S.divider(),

            /* ── PRODUKTY ── */
            S.listItem()
              .title('🛍️  Sklep & Produkty')
              .child(
                S.list()
                  .title('Sklep & Produkty')
                  .items([
                    S.documentTypeListItem('product').title('📦 Produkty'),
                    S.documentTypeListItem('category').title('📁 Kategorie'),
                    S.documentTypeListItem('brand').title('🏷️  Marki'),
                  ]),
              ),

            S.divider(),

            /* ── TREŚĆ ── */
            S.listItem()
              .title('✍️  Treści strony')
              .child(
                S.list()
                  .title('Treści strony')
                  .items([
                    S.documentTypeListItem('blogPost').title('📝 Artykuły bloga'),
                    S.documentTypeListItem('realizacja').title('🏠 Realizacje'),
                    S.documentTypeListItem('testimonial').title('⭐ Opinie klientów'),
                  ]),
              ),

            S.divider(),

            /* ── SKRÓTY ── */
            S.documentTypeListItem('product').title('📦 Produkty'),
            S.documentTypeListItem('blogPost').title('📝 Blog'),
            S.documentTypeListItem('realizacja').title('🏠 Realizacje'),
            S.documentTypeListItem('testimonial').title('⭐ Opinie'),
          ]),
    }),

    visionTool(),
  ],

  schema: { types: schemaTypes },
})
