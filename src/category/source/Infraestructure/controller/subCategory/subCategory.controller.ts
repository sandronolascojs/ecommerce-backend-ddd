import { Request, Response } from 'express'
import { CreateSubCategoryUseCase } from '../../../Application/subCategory/createSubCategoryUseCase'
import { GetSubCategoryByIdUseCase } from '../../../Application/subCategory/getSubCategoryByIdUseCase'
import { GetSubCategoriesUseCase } from '../../../Application/subCategory/getSubCategoriesUseCase'
import { UpdateSubCategoryUseCase } from '../../../Application/subCategory/updateSubCategoryByIdUseCase'
import { DeleteSubCategoryByIdUseCase } from '../../../Application/subCategory/deleteSubCategoryByIdUseCase'
import { SubCategoryEntity } from '../../../Domain/subCategory/subCategory.entity'
import { HttpResponse } from '../../../../../shared/utils/http.response'

export class SubCategoryController {
  constructor (
    private readonly createSubCategoryUseCase: CreateSubCategoryUseCase,
    private readonly getSubCategoryByIdUseCase: GetSubCategoryByIdUseCase,
    private readonly getSubCategoriesUseCase: GetSubCategoriesUseCase,
    private readonly updateSubCategoryUseCase: UpdateSubCategoryUseCase,
    private readonly deleteSubCategoryUseCase: DeleteSubCategoryByIdUseCase
  ) {}

  public createSubCategory = async (request: Request, response: Response): Promise<Response<SubCategoryEntity>> => {
    const subCategory = await this.createSubCategoryUseCase.execute(request.body)
    return new HttpResponse().CREATED(response, subCategory)
  }

  public getSubCategoryById = async (request: Request, response: Response): Promise<Response<SubCategoryEntity>> => {
    const subCategory = await this.getSubCategoryByIdUseCase.execute(request.params.id)
    if (subCategory === null) return new HttpResponse().NOT_FOUND(response, 'sub category not found')
    return new HttpResponse().OK(response, subCategory)
  }

  public getSubCategories = async (_request: Request, response: Response): Promise<Response<SubCategoryEntity[]>> => {
    const subCategories = await this.getSubCategoriesUseCase.execute()
    if (subCategories === null) return new HttpResponse().NOT_FOUND(response, 'sub categories not found')
    return new HttpResponse().OK(response, subCategories)
  }

  public updateSubCategoryById = async (request: Request, response: Response): Promise<Response<SubCategoryEntity>> => {
    const subCategory = await this.updateSubCategoryUseCase.execute(request.params.id, request.body)
    if (subCategory === null) return new HttpResponse().NOT_FOUND(response, 'sub category not found')
    return new HttpResponse().OK(response, subCategory)
  }

  public deleteSubCategoryById = async (request: Request, response: Response): Promise<Response<SubCategoryEntity>> => {
    const subCategory = await this.deleteSubCategoryUseCase.execute(request.params.id)
    if (subCategory === null) return new HttpResponse().NOT_FOUND(response, 'sub category not found')
    return new HttpResponse().OK(response)
  }
}
