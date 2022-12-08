import { ProductRepository } from '../Domain/product.repository'
import { ProductEntity } from '../Domain/product.entity'

export class GetProductsUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (): Promise<ProductEntity[] | null> {
    const products = await this.productRepository.getProducts()
    return products
  }
}
