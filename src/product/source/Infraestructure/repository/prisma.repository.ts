import { client } from '../db/prisma.db'
import { ProductRepository } from '../../Domain/product.repository'
import { ProductEntity } from '../../Domain/product.entity'

export class PrismaRepository implements ProductRepository {
  public getProducts = async (): Promise<ProductEntity[] | null> => {
    const products = await client.product.findMany()

    if (products.length === 0) return null

    return products
  }

  public getProductById = async (id: string): Promise<ProductEntity | null> => {
    const product = await client.product.findUnique({
      where: {
        id
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    })

    if (product === null) return null

    return product
  }

  public getProductsByCategoryId = async (categoryId: string): Promise<ProductEntity[] | null> => {
    const products = await client.product.findMany({
      where: {
        categoryId
      }
    })

    if (products.length === 0) return null

    return products
  }

  public getProductsBySubCategoryId = async (subCategoryId: string): Promise<ProductEntity[] | null> => {
    const products = await client.product.findMany({
      where: {
        subCategoryId
      },
      include: {
        category: {
          select: {
            name: true
          }
        },
        subCategory: {
          select: {
            name: true
          }
        }
      }
    })

    if (products.length === 0) return null

    return products
  }

  public createProduct = async (product: ProductEntity): Promise<ProductEntity> => {
    const newProduct = await client.product.create({
      data: product
    })

    return newProduct
  }

  public updateProductById = async (id: string, product: ProductEntity): Promise<ProductEntity | null> => {
    const findProduct = await this.getProductById(id)

    if (findProduct === null) return null

    const updatedProduct = await client.product.update({
      where: {
        id
      },
      data: product
    })

    return updatedProduct
  }

  public deleteProductById = async (id: string): Promise<ProductEntity | null> => {
    const findProduct = await this.getProductById(id)

    if (findProduct === null) return null

    const deletedProduct = await client.product.delete({
      where: {
        id
      }
    })

    return deletedProduct
  }
}
