import { ProductRepository } from '../Domain/product.repository'
import { ProductEntity } from '../Domain/product.entity'

export class UpdateProductByIdUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (id: string, product: ProductEntity): Promise<ProductEntity | null> {
    const productUpdated = await this.productRepository.updateProductById(id, product)
    return productUpdated
  }
}
