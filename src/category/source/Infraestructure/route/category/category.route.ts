import { RequestHandler, Router } from 'express'
import { PrismaRepository } from '../../repository/category/prisma.repository'
import { CreateCategoryUseCase } from '../../../Application/category/createCategoryUseCase'
import { GetCategoriesUseCase } from '../../../Application/category/getCategoriesUseCase'
import { GetCategoryByIdUseCase } from '../../../Application/category/getCategoryByIdUseCase'
import { UpdateCategoryByIdUseCase } from '../../../Application/category/updateCategoryByIdUseCase'
import { DeleteCategoryByIdUseCase } from '../../../Application/category/deleteCategoryByUseCase'
import { CategoryController } from '../../controller/category/category.controller'
import { adminTokenMiddleware } from '../../../../../shared/middlewares/verifyToken.middleware'
import { schemaValidator } from '../../../../../customer/source/Infraestructure/middlewares/schemaValidator.middleware'
import { createCategoryValidator } from '../../validators/category/createCategory.validator'
import { updateCategoryValidator } from '../../validators/category/updateCategory.validator'

const router = Router()

// repositorty
const prismaRepository = new PrismaRepository()

// usecases
const createCategory = new CreateCategoryUseCase(prismaRepository)
const getCategories = new GetCategoriesUseCase(prismaRepository)
const getCategoryById = new GetCategoryByIdUseCase(prismaRepository)
const updateCategoryById = new UpdateCategoryByIdUseCase(prismaRepository)
const deleteCategoryById = new DeleteCategoryByIdUseCase(prismaRepository)

// controller
const categoryController = new CategoryController(
  createCategory,
  getCategoryById,
  getCategories,
  updateCategoryById,
  deleteCategoryById
)

// routes
router.post('/', schemaValidator(createCategoryValidator), adminTokenMiddleware as RequestHandler, categoryController.createCategory as RequestHandler)
router.get('/', categoryController.getCategories as RequestHandler)
router.get('/:id', categoryController.getCategoryById as RequestHandler)
router.put('/:id', schemaValidator(updateCategoryValidator), adminTokenMiddleware as RequestHandler, categoryController.updateCategoryById as RequestHandler)
router.delete('/:id', adminTokenMiddleware as RequestHandler, categoryController.deleteCategoryById as RequestHandler)

export default router
