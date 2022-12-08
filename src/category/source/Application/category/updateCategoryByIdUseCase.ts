import { CategoryEntity } from '../../Domain/category/category.entity'
import { CategoryRepository } from '../../Domain/category/category.repository'

export class UpdateCategoryByIdUseCase {
  public categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute (id: string, category: CategoryEntity): Promise<CategoryEntity | null> {
    const categoryUpdated = await this.categoryRepository.updateCategoryById(id, category)
    return categoryUpdated
  }
}
