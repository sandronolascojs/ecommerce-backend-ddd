import { SubCategoryEntity } from './subCategory.entity'

export interface SubCategoryRepository {
  createSubCategory: (SubCategory: SubCategoryEntity) => Promise<SubCategoryEntity>
  getSubCategoryById: (id: string) => Promise<SubCategoryEntity | null>
  getSubCategories: () => Promise<SubCategoryEntity[] | null>
  updateSubCategoryById: (id: string, subCategory: SubCategoryEntity) => Promise<SubCategoryEntity | null>
  deleteSubCategoryById: (id: string) => Promise<SubCategoryEntity | null>
}
