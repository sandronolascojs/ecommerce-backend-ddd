import { Request, Response } from 'express'
import { HttpResponse } from '../../../../../shared/utils/http.response'
import { CreateCategoryUseCase } from '../../../Application/category/createCategoryUseCase'
import { GetCategoryByIdUseCase } from '../../../Application/category/getCategoryByIdUseCase'
import { GetCategoriesUseCase } from '../../../Application/category/getCategoriesUseCase'
import { UpdateCategoryByIdUseCase } from '../../../Application/category/updateCategoryByIdUseCase'
import { DeleteCategoryByIdUseCase } from '../../../Application/category/deleteCategoryByUseCase'
import { CategoryEntity } from '../../../Domain/category/category.entity'

export class CategoryController {
  constructor (
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly updateCategoryByIdUseCase: UpdateCategoryByIdUseCase,
    private readonly deleteCategoryByIdUseCase: DeleteCategoryByIdUseCase
  ) {}

  public createCategory = async (request: Request, response: Response): Promise<Response<CategoryEntity>> => {
    const category = await this.createCategoryUseCase.execute(request.body)

    return new HttpResponse().CREATED(response, category)
  }

  public getCategoryById = async (request: Request, response: Response): Promise<Response<CategoryEntity>> => {
    const category = await this.getCategoryByIdUseCase.execute(request.params.id)

    if (category === null) return new HttpResponse().NOT_FOUND(response, 'category not found')

    return new HttpResponse().OK(response, category)
  }

  public getCategories = async (request: Request, response: Response): Promise<Response<CategoryEntity[]>> => {
    const categories = await this.getCategoriesUseCase.execute()

    if (categories === null) return new HttpResponse().NOT_FOUND(response, 'categories not found')

    return new HttpResponse().OK(response, categories)
  }

  public updateCategoryById = async (request: Request, response: Response): Promise<Response<CategoryEntity>> => {
    const category = await this.updateCategoryByIdUseCase.execute(request.params.id, request.body)

    if (category === null) return new HttpResponse().NOT_FOUND(response, 'category not found')

    return new HttpResponse().OK(response, category)
  }

  public deleteCategoryById = async (request: Request, response: Response): Promise<Response<CategoryEntity>> => {
    const category = await this.deleteCategoryByIdUseCase.execute(request.params.id)

    if (category === null) return new HttpResponse().NOT_FOUND(response, 'category not found')

    return new HttpResponse().OK(response)
  }
}
