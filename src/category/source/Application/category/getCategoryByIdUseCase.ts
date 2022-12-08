import { CategoryEntity } from '../../Domain/category/category.entity'
import { CategoryRepository } from '../../Domain/category/category.repository'

export class GetCategoryByIdUseCase {
  public categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute (id: string): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.getCategoryById(id)
    return category
  }
}
