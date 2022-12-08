import { ProductEntity } from '../Domain/product.entity'
import { ProductRepository } from '../Domain/product.repository'

export class GetProductByIdUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.getProductById(id)
    return product
  }
}
