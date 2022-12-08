import { ProductEntity } from './product.entity'

export class ProductValue implements ProductEntity {
  public name: string
  public description: string
  public price: number
  public stock: number
  public image: string
  public categoryId: string
  public subCategoryId: string

  constructor ({ name, description, price, stock, image, categoryId, subCategoryId }: ProductValue) {
    this.name = name
    this.description = description
    this.price = price
    this.stock = stock
    this.image = image
    this.categoryId = categoryId
    this.subCategoryId = subCategoryId
  }
}
