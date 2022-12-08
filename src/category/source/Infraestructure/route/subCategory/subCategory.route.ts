import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../../repository/subCategory/prisma.repository'
import { CreateSubCategoryUseCase } from '../../../Application/subCategory/createSubCategoryUseCase'
import { GetSubCategoriesUseCase } from '../../../Application/subCategory/getSubCategoriesUseCase'
import { GetSubCategoryByIdUseCase } from '../../../Application/subCategory/getSubCategoryByIdUseCase'
import { UpdateSubCategoryUseCase } from '../../../Application/subCategory/updateSubCategoryByIdUseCase'
import { DeleteSubCategoryByIdUseCase } from '../../../Application/subCategory/deleteSubCategoryByIdUseCase'
import { SubCategoryController } from '../../controller/subCategory/subCategory.controller'
import { adminTokenMiddleware } from '../../../../../shared/middlewares/verifyToken.middleware'
import { schemaValidator } from '../../../../../customer/source/Infraestructure/middlewares/schemaValidator.middleware'
import { createSubCategoryValidator } from '../../validators/subCategory/createSubCategory.validator'
import { updateSubCategoryValidator } from '../../validators/subCategory/updateSubCategory.validator'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const createSubCategory = new CreateSubCategoryUseCase(prismaRepository)
const getSubCategories = new GetSubCategoriesUseCase(prismaRepository)
const getSubCategoryById = new GetSubCategoryByIdUseCase(prismaRepository)
const updateSubcategoryById = new UpdateSubCategoryUseCase(prismaRepository)
const deleteSubCategoryById = new DeleteSubCategoryByIdUseCase(prismaRepository)

// controller
const subCategoryController = new SubCategoryController(
  createSubCategory,
  getSubCategoryById,
  getSubCategories,
  updateSubcategoryById,
  deleteSubCategoryById
)

// routes
router.get('/', subCategoryController.getSubCategories as RequestHandler)
router.get('/:id', subCategoryController.getSubCategoryById as RequestHandler)
router.post('/', schemaValidator(createSubCategoryValidator), adminTokenMiddleware as RequestHandler, subCategoryController.createSubCategory as RequestHandler)
router.put('/:id', schemaValidator(updateSubCategoryValidator), adminTokenMiddleware as RequestHandler, subCategoryController.updateSubCategoryById as RequestHandler)
router.delete('/:id', adminTokenMiddleware as RequestHandler, subCategoryController.deleteSubCategoryById as RequestHandler)

export default router
