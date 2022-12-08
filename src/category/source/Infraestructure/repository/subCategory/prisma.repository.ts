import { client } from '../../db/prisma.db'
import { SubCategoryRepository } from '../../../Domain/subCategory/subCategory.repository'
import { SubCategoryEntity } from '../../../Domain/subCategory/subCategory.entity'

export class PrismaRepository implements SubCategoryRepository {
  public createSubCategory = async (subCategory: SubCategoryEntity): Promise<SubCategoryEntity> => {
    const newSubCategory = await client.subCategory.create({
      data: {
        ...subCategory
      }
    })

    return newSubCategory
  }

  public getSubCategoryById = async (id: string): Promise<SubCategoryEntity | null> => {
    const subCategory = await client.subCategory.findUnique({
      where: {
        id
      }
    })

    if (subCategory === null) return null

    return subCategory
  }

  public getSubCategories = async (): Promise<SubCategoryEntity[] | null> => {
    const subCategories = await client.subCategory.findMany()

    if (subCategories.length === 0) return null

    return subCategories
  }

  public updateSubCategoryById = async (id: string, subCategory: SubCategoryEntity): Promise<SubCategoryEntity | null> => {
    const findSubCategory = this.getSubCategoryById(id)
    if (findSubCategory === null) return null

    const updatedSubCategory = await client.subCategory.update({
      where: {
        id
      },
      data: {
        ...subCategory
      }
    })

    return updatedSubCategory
  }

  public deleteSubCategoryById = async (id: string): Promise<SubCategoryEntity | null> => {
    const findSubCategory = this.getSubCategoryById(id)
    if (findSubCategory === null) return null

    const deletedSubCategory = await client.subCategory.delete({
      where: {
        id
      }
    })

    return deletedSubCategory
  }
}
