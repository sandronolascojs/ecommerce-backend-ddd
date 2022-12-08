import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CustomerLoginUseCase } from '../../Application/customerLoginUseCase'
import { CustomerRegistrationUseCase } from '../../Application/CustomerRegistrationUseCase'
import { RefreshTokenUseCase } from '../../Application/refreshTokenUseCase'
import { AuthenticationController } from '../controller/authentication.controller'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const customerLogin = new CustomerLoginUseCase(prismaRepository)
const customerRegistration = new CustomerRegistrationUseCase(prismaRepository)
const refreshToken = new RefreshTokenUseCase(prismaRepository)

// controller
const authenticationCustomerController = new AuthenticationController(
  customerLogin,
  customerRegistration,
  refreshToken)

// routes
router.post('/login', authenticationCustomerController.customerLogin as RequestHandler)
router.post('/registration', authenticationCustomerController.customerRegistration as RequestHandler)
router.post('/refresh-token', authenticationCustomerController.refreshToken as RequestHandler)

export default router
