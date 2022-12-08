import { CategoryEntity } from '../../Domain/category/category.entity'
import { CategoryRepository } from '../../Domain/category/category.repository'

export class DeleteCategoryByIdUseCase {
  public categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute (id: string): Promise<CategoryEntity | null> {
    const categoryDeleted = await this.categoryRepository.deleteCategoryById(id)
    return categoryDeleted
  }
}
