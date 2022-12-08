import { CategoryEntity } from './category.entity'

export class CategoryValue implements CategoryEntity {
  name: string
  description: string
  image: string

  constructor ({ name, description, image }: CategoryEntity) {
    this.name = name
    this.description = description
    this.image = image
  }
}
