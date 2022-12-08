
import { CategoryEntity } from '../../Domain/category/category.entity'
import { CategoryRepository } from '../../Domain/category/category.repository'

export class CreateCategoryUseCase {
  public categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute (category: CategoryEntity): Promise<CategoryEntity> {
    const categoryCreated = await this.categoryRepository.createCategory(category)
    return categoryCreated
  }
}
