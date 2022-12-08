import { SubCategoryEntity } from './subCategory.entity'

export class SubCategoryValue implements SubCategoryEntity {
  name: string
  description: string
  image: string
  categoryId: string

  constructor ({ name, description, image, categoryId }: SubCategoryEntity) {
    this.name = name
    this.description = description
    this.image = image
    this.categoryId = categoryId
  }
}
