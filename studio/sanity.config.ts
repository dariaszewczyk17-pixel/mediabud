import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'mediabud',
  title: 'Media Bud – CMS',

  // ⚠️  UZUPEŁNIJ: skopiuj Project ID z sanity.io/manage
  projectId: 'SANITY_PROJECT_ID',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Zawartość')
          .items([
            S.listItem()
              .title('Ustawienia witryny')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('category').title('Kategorie'),
            S.documentTypeListItem('product').title('Produkty'),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Artykuły bloga'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
