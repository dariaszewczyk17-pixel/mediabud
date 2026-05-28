import { productSchema }     from './product'
import { categorySchema }    from './category'
import { brandSchema }       from './brand'
import { blogPostSchema }    from './blogPost'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  siteSettingsSchema,
  brandSchema,
  categorySchema,
  productSchema,
  blogPostSchema,
]
