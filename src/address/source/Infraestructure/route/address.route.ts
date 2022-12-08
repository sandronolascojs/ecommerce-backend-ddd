import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CreateAddressUseCase } from '../../Application/createAddressUseCase'
import { GetAddressByIdUseCase } from '../../Application/getAddressByIdUseCase'
import { GetAddressesUseCase } from '../../Application/getAddressesUseCase'
import { GetAddresesByCustomerIdUseCase } from '../../Application/getAddressesByCustomerIdUseCase'
import { UpdateAddressByIdUseCase } from '../../Application/updateAddressByIdUseCase'
import { DeleteAddressByIdUseCase } from '../../Application/deleteAddressByIdUseCase'
import { AddrressController } from '../controller/address.controller'
import { adminTokenMiddleware } from '../../../../shared/middlewares/verifyToken.middleware'
import { customerTokenMiddleware } from '../../../../shared/middlewares/customerToken.middleware'
import { schemaValidator } from '../middlewares/schemaValidator.middleware'
import { createAddressValidator } from '../validators/createAddress.validator'
import { updateAddressValidator } from '../validators/updateAddress.validator'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const createAddress = new CreateAddressUseCase(prismaRepository)
const getAddressesUseCase = new GetAddressesUseCase(prismaRepository)
const getAddressById = new GetAddressByIdUseCase(prismaRepository)
const getAddressesByCustomerId = new GetAddresesByCustomerIdUseCase(prismaRepository)
const updateAddressById = new UpdateAddressByIdUseCase(prismaRepository)
const deleteAddressById = new DeleteAddressByIdUseCase(prismaRepository)

// controllers
const addressController = new AddrressController(
  createAddress,
  getAddressById,
  getAddressesUseCase,
  getAddressesByCustomerId,
  updateAddressById,
  deleteAddressById
)

// routes
router.get('/', adminTokenMiddleware as RequestHandler, addressController.getAddresses as RequestHandler)
router.get('/:id', customerTokenMiddleware as RequestHandler, addressController.getAddressById as RequestHandler)
router.get('/customer/:customerId', customerTokenMiddleware as RequestHandler, addressController.getAddressesByCustomerId as RequestHandler)
router.post('/', schemaValidator(createAddressValidator), customerTokenMiddleware as RequestHandler, addressController.createAddress as RequestHandler)
router.put('/:id', schemaValidator(updateAddressValidator), customerTokenMiddleware as RequestHandler, addressController.updateAddressById as RequestHandler)
router.delete('/:id', customerTokenMiddleware as RequestHandler, addressController.deleteAddressById as RequestHandler)

export default router
