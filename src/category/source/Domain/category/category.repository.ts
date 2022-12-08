import { CategoryEntity } from './category.entity'

export interface CategoryRepository {
  createCategory: (category: CategoryEntity) => Promise<CategoryEntity>
  getCategoryById: (id: string) => Promise<CategoryEntity | null>
  getCategories: () => Promise<CategoryEntity[] | null>
  updateCategoryById: (id: string, category: CategoryEntity) => Promise<CategoryEntity | null>
  deleteCategoryById: (id: string) => Promise<CategoryEntity | null>
}
