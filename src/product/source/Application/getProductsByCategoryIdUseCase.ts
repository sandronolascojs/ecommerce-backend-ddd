import { ProductRepository } from '../Domain/product.repository'
import { ProductEntity } from '../Domain/product.entity'

export class GetProductsByCategoryIdUseCase {
  public productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (categoryId: string): Promise<ProductEntity[] | null> {
    const products = await this.productRepository.getProductsByCategoryId(categoryId)
    return products
  }
}
