import { ProductEntity } from '../Domain/product.entity'
import { ProductRepository } from '../Domain/product.repository'

export class CreateProductUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (product: ProductEntity): Promise<ProductEntity> {
    const productCreated = await this.productRepository.createProduct(product)
    return productCreated
  }
}
