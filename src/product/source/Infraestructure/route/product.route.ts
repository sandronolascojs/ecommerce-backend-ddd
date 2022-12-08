import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CreateProductUseCase } from '../../Application/createProductUseCase'
import { GetProductsUseCase } from '../../Application/getProductsUseCase'
import { GetProductByIdUseCase } from '../../Application/getProductByIdUseCase'
import { GetProductsByCategoryIdUseCase } from '../../Application/getProductsByCategoryIdUseCase'
import { GetProductsBySubCategoryIdUseCase } from '../../Application/getProductsBySubCategoryIdUseCase'
import { UpdateProductByIdUseCase } from '../../Application/updateProductByIdUseCase'
import { DeleteProductByIdUseCase } from '../../Application/deleteProductByIdUseCase'
import { ProductController } from '../controller/product.controller'
import { adminTokenMiddleware } from '../../../../shared/middlewares/verifyToken.middleware'
import { schemaValidator } from '../middlewares/schemaValidator.middleware'
import { createProductValidator } from '../validators/createProduct.validator'
import { updateProductValidator } from '../validators/updateProduct.validator'
const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const createProduct = new CreateProductUseCase(prismaRepository)
const getProducts = new GetProductsUseCase(prismaRepository)
const getProductById = new GetProductByIdUseCase(prismaRepository)
const getProductsByCategoryId = new GetProductsByCategoryIdUseCase(prismaRepository)
const getProductsBySubCategoryId = new GetProductsBySubCategoryIdUseCase(prismaRepository)
const updateProductById = new UpdateProductByIdUseCase(prismaRepository)
const deleteProductById = new DeleteProductByIdUseCase(prismaRepository)

// controllers
const productController = new ProductController(
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  updateProductById,
  deleteProductById
)

// routes
router.post('/', schemaValidator(createProductValidator), adminTokenMiddleware as RequestHandler, productController.createProduct as RequestHandler)
router.get('/', productController.getProducts as RequestHandler)
router.get('/:id', productController.getProductById as RequestHandler)
router.get('/category/:categoryId', productController.getProductsByCategoryId as RequestHandler)
router.get('/subcategory/:subCategoryId', productController.getProductsBySubCategoryId as RequestHandler)
router.put('/:id', schemaValidator(updateProductValidator), adminTokenMiddleware as RequestHandler, productController.updateProductById as RequestHandler)
router.delete('/:id', adminTokenMiddleware as RequestHandler, productController.deleteProductById as RequestHandler)

export default router
