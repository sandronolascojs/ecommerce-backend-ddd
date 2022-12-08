import { client } from '../../db/prisma.db'
import { CategoryRepository } from '../../../Domain/category/category.repository'
import { CategoryEntity } from '../../../Domain/category/category.entity'

export class PrismaRepository implements CategoryRepository {
  public createCategory = async (category: CategoryEntity): Promise<CategoryEntity> => {
    const newCategory = await client.category.create({
      data: {
        ...category
      }
    })

    return newCategory
  }

  public getCategoryById = async (id: string): Promise<CategoryEntity | null> => {
    const category = await client.category.findUnique({
      where: {
        id
      },
      include: {
        subCategories: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    if (category === null) return null

    return category
  }

  public getCategories = async (): Promise<CategoryEntity[] | null> => {
    const categories = await client.category.findMany({
      include: {
        subCategories: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    if (categories.length === 0) return null

    return categories
  }

  public updateCategoryById = async (id: string, category: CategoryEntity): Promise<CategoryEntity | null> => {
    const findCategory = this.getCategoryById(id)

    if (findCategory === null) return null

    const updatedCategory = await client.category.update({
      where: {
        id
      },
      data: {
        ...category
      }
    })

    return updatedCategory
  }

  public deleteCategoryById = async (id: string): Promise<CategoryEntity | null> => {
    const findCategory = await this.getCategoryById(id)

    if (findCategory === null) return null

    await client.category.delete({
      where: {
        id
      }
    })

    return findCategory
  }
}
