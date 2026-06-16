import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  groups: [
    { name: 'basic',   title: '📦 Podstawowe' },
    { name: 'content', title: '📝 Treść / Opisy' },
    { name: 'specs',   title: '⚙️  Dane techniczne' },
    { name: 'related', title: '🔗 Powiązania' },
    { name: 'seo',     title: '🔍 SEO / Meta' },
  ],
  fields: [
    /* ── BASIC ── */
    defineField({ group:'basic', name:'name',     title:'Nazwa produktu',             type:'string',  validation: R=>R.required() }),
    defineField({ group:'basic', name:'slug',     title:'Slug URL',                   type:'slug',    options:{source:'name',maxLength:120}, validation:R=>R.required() }),
    defineField({ group:'basic', name:'sku',      title:'SKU / Indeks produktu',      type:'string' }),
    defineField({ group:'basic', name:'unit',     title:'Jednostka (szt, m², worek)', type:'string' }),
    defineField({ group:'basic', name:'brand',    title:'Marka',                      type:'reference', to:[{type:'brand'}] }),
    defineField({ group:'basic', name:'category', title:'Kategoria',                  type:'reference', to:[{type:'category'}], validation:R=>R.required() }),
defineField({ group:'basic', name:'rootCategory', title:'Kategoria główna (root)', type:'reference', to:[{type:'category'}], description:'Automatycznie wypełniana przez skrypt migracji — ROOT kategorii (poziom 0). Nie edytuj ręcznie.', readOnly:false }),
    defineField({ group:'basic', name:'images',   title:'Zdjęcia produktu',           type:'array', of:[{type:'image',options:{hotspot:true}}] }),

    defineField({ group:'basic', name:'priceMin', title:'Cena od (PLN netto)', type:'number' }),
    defineField({ group:'basic', name:'priceMax', title:'Cena do (PLN netto)', type:'number' }),

    defineField({ group:'basic', name:'inStock',      title:'Dostępny w magazynie?', type:'boolean', initialValue:true }),
    defineField({ group:'basic', name:'featured',     title:'Produkt wyróżniony?',   type:'boolean', initialValue:false }),
    defineField({ group:'basic', name:'isNew',        title:'Nowość?',               type:'boolean', initialValue:false }),
    defineField({ group:'basic', name:'isBestseller', title:'Bestseller?',            type:'boolean', initialValue:false }),
    defineField({ group:'basic', name:'popularity',   title:'Popularność (0-100)',    type:'number', initialValue:50, description:'Wyższy = bardziej popularny. Używane do domyślnego sortowania w kategoriach.', validation:R=>R.min(0).max(100) }),

    /* ── CONTENT ── */
    defineField({ group:'content', name:'shortDescription', title:'Krótki opis (zajawka, max 300 znaków)', type:'text', rows:3, validation:R=>R.max(300) }),
    defineField({ group:'content', name:'description',      title:'Długi opis produktu',                   type:'text', rows:8 }),
    defineField({ group:'content', name:'application',      title:'Zastosowanie',                          type:'text', rows:4 }),
    defineField({ group:'content', name:'advantages',       title:'Zalety produktu (lista)',               type:'array', of:[{type:'string'}] }),
    defineField({ group:'content', name:'warnings',         title:'Ostrzeżenia / ważne informacje',        type:'array', of:[{type:'string'}] }),
    defineField({
      group:'content', name:'faq', title:'FAQ – pytania i odpowiedzi',
      type:'array',
      of:[{ type:'object', name:'faqItem', title:'Pytanie i odpowiedź',
        fields:[
          defineField({name:'q', title:'Pytanie',   type:'string'}),
          defineField({name:'a', title:'Odpowiedź', type:'text', rows:3}),
        ],
        preview:{select:{title:'q'}},
      }],
    }),

    /* ── SPECS ── */
    defineField({
      group:'specs', name:'technicalSpec', title:'Parametry techniczne',
      type:'array',
      of:[{ type:'object', name:'specItem', title:'Parametr',
        fields:[
          defineField({name:'key',      title:'Klucz kanoniczny (np. lambda, grubosc)', type:'string', description:'Unikalny identyfikator parametru do filtrowania/sortowania. Małe litery, bez spacji.'}),
          defineField({name:'label',    title:'Nazwa wyświetlana (np. Lambda λ)',       type:'string'}),
          defineField({name:'value',    title:'Wartość (np. 0.033)',                    type:'string'}),
          defineField({name:'unit',     title:'Jednostka (np. W/(m·K), mm, kg/m²)',     type:'string'}),
          defineField({name:'priority', title:'Priorytet wyświetlania (1=najwyższy)',   type:'number', initialValue:99}),
        ],
        preview:{select:{title:'label',subtitle:'value'}},
      }],
    }),
    defineField({ group:'specs', name:'tags', title:'Tagi / słowa kluczowe', type:'array', of:[{type:'string'}], options:{layout:'tags'} }),

    /* ── RELATED ── */
    defineField({
      group:'related', name:'related', title:'Produkty powiązane (max 6)',
      type:'array',
      of:[{type:'reference', to:[{type:'product'}]}],
      validation:R=>R.max(6),
    }),

    /* ── SEO ── */
    defineField({ group:'seo', name:'seoDescription', title:'Opis SEO / AI (dłuższy, dla Google i AI)',  type:'text',   rows:4 }),
    defineField({ group:'seo', name:'metaTitle',       title:'Meta Title (max 70 znaków)',               type:'string', validation:R=>R.max(70) }),
    defineField({ group:'seo', name:'metaDescription', title:'Meta Description (max 160 znaków)',        type:'text',   rows:2, validation:R=>R.max(160) }),
  ],
  orderings:[
    { title:'Popularność',     name:'popularity',  by:[{field:'popularity',      direction:'desc'}] },
    { title:'Nazwa A–Z',       name:'nameAsc',     by:[{field:'name',          direction:'asc'}] },
    { title:'Kategoria A–Z',   name:'categoryAsc', by:[{field:'category._ref', direction:'asc'}] },
    { title:'Bestsellery',     name:'bestseller',  by:[{field:'isBestseller',  direction:'desc'}] },
    { title:'Nowości',         name:'newest',      by:[{field:'isNew',         direction:'desc'}] },
  ],
  preview:{ select:{title:'name', media:'images.0', subtitle:'category.name'} },
})
