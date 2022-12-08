import { SubCategoryEntity } from '../../Domain/subCategory/subCategory.entity'
import { SubCategoryRepository } from '../../Domain/subCategory/subCategory.repository'

export class CreateSubCategoryUseCase {
  public subCategoryRepository: SubCategoryRepository

  constructor (subCategoryRepository: SubCategoryRepository) {
    this.subCategoryRepository = subCategoryRepository
  }

  async execute (subCategory: SubCategoryEntity): Promise<SubCategoryEntity> {
    const subCategoryCreated = await this.subCategoryRepository.createSubCategory(subCategory)
    return subCategoryCreated
  }
}
