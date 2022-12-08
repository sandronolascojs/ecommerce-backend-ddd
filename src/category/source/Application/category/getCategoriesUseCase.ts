import { CategoryEntity } from '../../Domain/category/category.entity'
import { CategoryRepository } from '../../Domain/category/category.repository'

export class GetCategoriesUseCase {
  public categoryRepository: CategoryRepository

  constructor (categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute (): Promise<CategoryEntity[] | null> {
    const categories = await this.categoryRepository.getCategories()
    return categories
  }
}
