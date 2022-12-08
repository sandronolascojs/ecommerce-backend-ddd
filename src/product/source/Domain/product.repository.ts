import { ProductEntity } from './product.entity'

export interface ProductRepository {
  createProduct: (product: ProductEntity) => Promise<ProductEntity>
  getProducts: () => Promise<ProductEntity[] | null>
  getProductsByCategoryId: (categoryId: string) => Promise<ProductEntity[] | null>
  getProductsBySubCategoryId: (subCategoryId: string) => Promise<ProductEntity[] | null>
  getProductById: (id: string) => Promise<ProductEntity | null>
  updateProductById: (id: string, product: ProductEntity) => Promise<ProductEntity | null>
  deleteProductById: (id: string) => Promise<ProductEntity | null>
}
