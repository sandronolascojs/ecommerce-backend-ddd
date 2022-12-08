import { ProductRepository } from '../Domain/product.repository'
import { ProductEntity } from '../Domain/product.entity'

export class GetProductsBySubCategoryIdUseCase {
  private readonly productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  public async execute (subCategoryId: string): Promise<ProductEntity[] | null> {
    const products = await this.productRepository.getProductsBySubCategoryId(subCategoryId)
    return products
  }
}
