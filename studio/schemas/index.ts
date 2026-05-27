import { productSchema } from './product'
import { categorySchema } from './category'
import { blogPostSchema } from './blogPost'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  siteSettingsSchema,
  categorySchema,
  productSchema,
  blogPostSchema,
]
