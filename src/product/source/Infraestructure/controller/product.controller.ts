import { GetProductsByCategoryIdUseCase } from '../../Application/getProductsByCategoryIdUseCase'
import { GetProductByIdUseCase } from '../../Application/getProductByIdUseCase'
import { GetProductsBySubCategoryIdUseCase } from '../../Application/getProductsBySubCategoryIdUseCase'
import { GetProductsUseCase } from '../../Application/getProductsUseCase'
import { CreateProductUseCase } from '../../Application/createProductUseCase'
import { UpdateProductByIdUseCase } from '../../Application/updateProductByIdUseCase'
import { DeleteProductByIdUseCase } from '../../Application/deleteProductByIdUseCase'
import { Request, Response } from 'express'
import { ProductEntity } from '../../Domain/product.entity'
import { HttpResponse } from '../../../../shared/utils/http.response'

export class ProductController {
  constructor (
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getProductsByCategoryIdUseCase: GetProductsByCategoryIdUseCase,
    private readonly getProductsBySubCategoryIdUseCase: GetProductsBySubCategoryIdUseCase,
    private readonly updateProductByIdUseCase: UpdateProductByIdUseCase,
    private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase
  ) {}

  public createProduct = async (request: Request, response: Response): Promise<Response<ProductEntity>> => {
    const product = await this.createProductUseCase.execute(request.body)
    return new HttpResponse().CREATED(response, product)
  }

  public getProducts = async (_request: Request, response: Response): Promise<Response<ProductEntity[] | null>> => {
    const products = await this.getProductsUseCase.execute()

    if (products === null) return new HttpResponse().NOT_FOUND(response, 'Products not found')

    return new HttpResponse().OK(response, products)
  }

  public getProductById = async (request: Request, response: Response): Promise<Response<ProductEntity | null>> => {
    const { id } = request.params
    const product = await this.getProductByIdUseCase.execute(id)

    if (product === null) return new HttpResponse().NOT_FOUND(response, 'Product not found')

    return new HttpResponse().OK(response, product)
  }

  public getProductsByCategoryId = async (request: Request, response: Response): Promise<Response<ProductEntity[] | null>> => {
    const { categoryId } = request.params

    const products = await this.getProductsByCategoryIdUseCase.execute(categoryId)

    if (products === null) return new HttpResponse().NOT_FOUND(response, 'Products not found')

    return new HttpResponse().OK(response, products)
  }

  public getProductsBySubCategoryId = async (request: Request, response: Response): Promise<Response<ProductEntity[] | null>> => {
    const { subCategoryId } = request.params

    const products = await this.getProductsBySubCategoryIdUseCase.execute(subCategoryId)

    if (products === null) return new HttpResponse().NOT_FOUND(response, 'Products not found')

    return new HttpResponse().OK(response, products)
  }

  public updateProductById = async (request: Request, response: Response): Promise<Response<ProductEntity | null>> => {
    const { id } = request.params

    const product = await this.updateProductByIdUseCase.execute(id, request.body)

    if (product === null) return new HttpResponse().NOT_FOUND(response, 'Product not found')

    return new HttpResponse().OK(response, product)
  }

  public deleteProductById = async (request: Request, response: Response): Promise<Response<ProductEntity | null>> => {
    const { id } = request.params

    const product = await this.deleteProductByIdUseCase.execute(id)

    if (product === null) return new HttpResponse().NOT_FOUND(response, 'Product not found')

    return new HttpResponse().OK(response, product)
  }
}
