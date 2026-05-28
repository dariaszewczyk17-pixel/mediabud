import { defineType, defineField } from 'sanity'

export const brandSchema = defineType({
  name: 'brand',
  title: 'Marka',
  type: 'document',
  fields: [
    defineField({ name:'name',        title:'Nazwa marki',       type:'string', validation:R=>R.required() }),
    defineField({ name:'slug',        title:'Slug URL',          type:'slug',   options:{source:'name',maxLength:96}, validation:R=>R.required() }),
    defineField({ name:'logo',        title:'Logo marki',        type:'image',  options:{hotspot:true} }),
    defineField({ name:'description', title:'Opis marki',        type:'text',   rows:3 }),
    defineField({ name:'website',     title:'Strona producenta', type:'url' }),
    defineField({ name:'country',     title:'Kraj producenta',   type:'string' }),
    defineField({ name:'featured',    title:'Wyróżniona marka?', type:'boolean', initialValue:false }),
  ],
  preview:{ select:{title:'name', media:'logo'} },
})
