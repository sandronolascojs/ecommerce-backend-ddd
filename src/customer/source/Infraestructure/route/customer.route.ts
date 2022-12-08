import { RequestHandler, Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CreateCustomerUseCase } from '../../Application/createCustomerUseCase'
import { GetCustomerByIdUseCase } from '../../Application/getCustomerByIdUseCase'
import { GetCustomersUseCase } from '../../Application/getCustomersUseCase'
import { GetCustomerByDetailsUseCase } from '../../Application/getCustomerByDetailsUseCase'
import { UpdateCustomerByIdUseCase } from '../../Application/updateCustomerByIdUseCase'
import { DeleteCustomerByIdUseCase } from '../../Application/deleteCustomerByIdUseCase'
import { CustomerController } from '../controller/customer.controller'
import { schemaValidator } from '../middlewares/schemaValidator.middleware'
import { createCustomerValidator } from '../validators/createCustomer.validator'
import { updateCustomerValidator } from '../validators/updateCustomer.validator'
import { detailsCustomerValidator } from '../validators/detailsCustomer.validator'
import { adminTokenMiddleware } from '../../../../shared/middlewares/verifyToken.middleware'
import { customerTokenMiddleware } from '../../../../shared/middlewares/customerToken.middleware'

const router = Router()

// repositorty
const prismaRepository = new PrismaRepository()

// usecases
const createCustomer = new CreateCustomerUseCase(prismaRepository)
const getCustomers = new GetCustomersUseCase(prismaRepository)
const getCustomerById = new GetCustomerByIdUseCase(prismaRepository)
const getCustomerByDetails = new GetCustomerByDetailsUseCase(prismaRepository)
const updateCustomerById = new UpdateCustomerByIdUseCase(prismaRepository)
const deleteCustomerById = new DeleteCustomerByIdUseCase(prismaRepository)

// controller
const customerController = new CustomerController(
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByDetails,
  updateCustomerById,
  deleteCustomerById
)

// routes
router.get('/', adminTokenMiddleware as RequestHandler, customerController.getCustomers as RequestHandler)
router.get('/:id', customerTokenMiddleware as RequestHandler, customerController.getCustomerById as RequestHandler)
router.post('/details', schemaValidator(detailsCustomerValidator), customerController.getCustomerByDetails as RequestHandler)
router.post('/', schemaValidator(createCustomerValidator), customerController.createCustomer as RequestHandler)
router.put('/', customerTokenMiddleware as RequestHandler, schemaValidator(updateCustomerValidator), customerController.updateCustomerById as RequestHandler)
router.delete('/', customerTokenMiddleware as RequestHandler, customerController.deleteCustomerById as RequestHandler)

export default router
