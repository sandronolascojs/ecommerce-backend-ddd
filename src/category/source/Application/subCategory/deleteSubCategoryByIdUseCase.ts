import { SubCategoryEntity } from '../../Domain/subCategory/subCategory.entity'
import { SubCategoryRepository } from '../../Domain/subCategory/subCategory.repository'

export class DeleteSubCategoryByIdUseCase {
  public subCategoryRepository: SubCategoryRepository

  constructor (subCategoryRepository: SubCategoryRepository) {
    this.subCategoryRepository = subCategoryRepository
  }

  async execute (id: string): Promise<SubCategoryEntity | null> {
    const subCategory = await this.subCategoryRepository.deleteSubCategoryById(id)
    return subCategory
  }
}
