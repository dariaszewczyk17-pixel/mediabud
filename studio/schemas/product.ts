import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  groups: [
    { name: 'basic',   title: 'Podstawowe' },
    { name: 'content', title: 'Treść SEO' },
    { name: 'specs',   title: 'Dane techniczne' },
    { name: 'related', title: 'Powiązania' },
    { name: 'seo',     title: 'SEO / Meta' },
  ],
  fields: [
    defineField({ group:'basic', name:'name',     title:'Nazwa produktu',             type:'string',  validation: R=>R.required() }),
    defineField({ group:'basic', name:'slug',     title:'Slug URL',                   type:'slug',    options:{source:'name',maxLength:120}, validation:R=>R.required() }),
    defineField({ group:'basic', name:'sku',      title:'SKU / Indeks',               type:'string' }),
    defineField({ group:'basic', name:'unit',     title:'Jednostka (szt, m², worek)', type:'string' }),
    defineField({ group:'basic', name:'brand',    title:'Marka',                      type:'reference', to:[{type:'brand'}] }),
    defineField({ group:'basic', name:'category', title:'Kategoria',                  type:'reference', to:[{type:'category'}], validation:R=>R.required() }),
    defineField({ group:'basic', name:'images',   title:'Zdjęcia produktu',           type:'array', of:[{type:'image',options:{hotspot:true}}] }),
    defineField({ group:'basic', name:'featured', title:'Produkt wyróżniony?',        type:'boolean', initialValue:false }),
    defineField({ group:'basic', name:'inStock',  title:'Dostępny?',                  type:'boolean', initialValue:true }),
    defineField({ group:'basic', name:'priceMin', title:'Cena od (PLN netto)',         type:'number' }),
    defineField({ group:'basic', name:'priceMax', title:'Cena do (PLN netto)',         type:'number' }),

    defineField({ group:'content', name:'shortDescription', title:'Krótki opis (zajawka)', type:'text', rows:3, validation:R=>R.max(300) }),
    defineField({ group:'content', name:'description',      title:'Długi opis',            type:'text', rows:8 }),
    defineField({ group:'content', name:'application',      title:'Zastosowanie',          type:'text', rows:4 }),
    defineField({ group:'content', name:'advantages',       title:'Zalety produktu',       type:'array', of:[{type:'string'}] }),
    defineField({ group:'content', name:'warnings',         title:'Ostrzeżenia',           type:'array', of:[{type:'string'}] }),
    defineField({
      group:'content', name:'faq', title:'FAQ',
      type:'array',
      of:[{ type:'object', name:'faqItem', title:'Pytanie i odpowiedź',
        fields:[
          defineField({name:'q', title:'Pytanie',   type:'string'}),
          defineField({name:'a', title:'Odpowiedź', type:'text', rows:3}),
        ],
        preview:{select:{title:'q'}},
      }],
    }),

    defineField({
      group:'specs', name:'technicalSpec', title:'Parametry techniczne',
      type:'array',
      of:[{ type:'object', name:'specItem', title:'Parametr',
        fields:[
          defineField({name:'label', title:'Nazwa parametru', type:'string'}),
          defineField({name:'value', title:'Wartość',         type:'string'}),
        ],
        preview:{select:{title:'label',subtitle:'value'}},
      }],
    }),
    defineField({ group:'specs', name:'tags', title:'Tagi / słowa kluczowe', type:'array', of:[{type:'string'}], options:{layout:'tags'} }),

    defineField({
      group:'related', name:'related', title:'Produkty powiązane',
      type:'array',
      of:[{type:'reference', to:[{type:'product'}]}],
      validation:R=>R.max(6),
    }),

    defineField({ group:'seo', name:'seoDescription', title:'Opis SEO (AI-friendly)', type:'text',   rows:4 }),
    defineField({ group:'seo', name:'metaTitle',       title:'Meta Title',            type:'string', validation:R=>R.max(70) }),
    defineField({ group:'seo', name:'metaDescription', title:'Meta Description',      type:'text',   rows:2, validation:R=>R.max(160) }),
  ],
  orderings:[
    { title:'Nazwa A–Z', name:'nameAsc',     by:[{field:'name',          direction:'asc'}] },
    { title:'Kategoria', name:'categoryAsc', by:[{field:'category._ref', direction:'asc'}] },
  ],
  preview:{ select:{title:'name', media:'images.0', subtitle:'category.name'} },
})
