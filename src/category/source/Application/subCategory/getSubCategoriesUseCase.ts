import { SubCategoryEntity } from '../../Domain/subCategory/subCategory.entity'
import { SubCategoryRepository } from '../../Domain/subCategory/subCategory.repository'

export class GetSubCategoriesUseCase {
  public subCategoryRepository: SubCategoryRepository

  constructor (subCategoryRepository: SubCategoryRepository) {
    this.subCategoryRepository = subCategoryRepository
  }

  async execute (): Promise<SubCategoryEntity[] | null> {
    const subCategories = await this.subCategoryRepository.getSubCategories()
    return subCategories
  }
}
