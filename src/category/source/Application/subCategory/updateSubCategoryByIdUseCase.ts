import { SubCategoryEntity } from '../../Domain/subCategory/subCategory.entity'
import { SubCategoryRepository } from '../../Domain/subCategory/subCategory.repository'

export class UpdateSubCategoryUseCase {
  public subCategoryRepository: SubCategoryRepository

  constructor (subCategoryRepository: SubCategoryRepository) {
    this.subCategoryRepository = subCategoryRepository
  }

  async execute (id: string, subCategory: SubCategoryEntity): Promise<SubCategoryEntity | null> {
    const subCategoryUpdated = await this.subCategoryRepository.updateSubCategoryById(id, subCategory)
    return subCategoryUpdated
  }
}
