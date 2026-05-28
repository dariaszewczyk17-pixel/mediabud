import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'mediabud',
  title: 'Media Bud – CMS',
  projectId: 'nzcwegq7',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Zawartość')
          .items([
            S.listItem().title('Ustawienia witryny').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('brand').title('🏷️  Marki'),
            S.documentTypeListItem('category').title('📁 Kategorie'),
            S.documentTypeListItem('product').title('📦 Produkty'),
            S.divider(),
            S.documentTypeListItem('blogPost').title('📝 Artykuły bloga'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
