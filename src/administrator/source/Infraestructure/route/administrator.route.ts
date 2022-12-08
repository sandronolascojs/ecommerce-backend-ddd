import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CreateAdministratorUseCase } from '../../Application/createAdministratorUseCase'
import { GetAdministratorByIdUseCase } from '../../Application/getAdministratorByIdUseCase'
import { UpdateAdministratorByIdUseCase } from '../../Application/updateAdministratorByUseCase'
import { DeleteAdministratorByIdUseCase } from '../../Application/deleteAdministratorByIdUseCase'
import { AdministratorController } from '../controller/administrator.controller'
import { GetAdministratorsUseCase } from '../../Application/getAdministratorsUseCase'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const getAdministrators = new GetAdministratorsUseCase(prismaRepository)
const createAdministrator = new CreateAdministratorUseCase(prismaRepository)
const getAdministratorById = new GetAdministratorByIdUseCase(prismaRepository)
const getAdministratorByEmail = new GetAdministratorByIdUseCase(prismaRepository)
const updateAdministratorById = new UpdateAdministratorByIdUseCase(prismaRepository)
const deleteAdministratorById = new DeleteAdministratorByIdUseCase(prismaRepository)

// controller
const administratorController = new AdministratorController(
  createAdministrator,
  getAdministrators,
  getAdministratorById,
  getAdministratorByEmail,
  updateAdministratorById,
  deleteAdministratorById
)

// routes
router.get('/', administratorController.getAdministrators as RequestHandler)
router.post('/', administratorController.createAdministrator as RequestHandler)
router.get('/:id', administratorController.getAdministratorById as RequestHandler)
router.get('/email/:email', administratorController.getAdministratorByEmail as RequestHandler)
router.put('/:id', administratorController.updateAdministratorById as RequestHandler)
router.delete('/:id', administratorController.deleteAdministratorById as RequestHandler)

export default router
