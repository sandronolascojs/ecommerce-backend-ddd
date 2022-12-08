import { ProductRepository } from '../Domain/product.repository'
import { ProductEntity } from '../Domain/product.entity'

export class DeleteProductByIdUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.deleteProductById(id)
    return product
  }
}
