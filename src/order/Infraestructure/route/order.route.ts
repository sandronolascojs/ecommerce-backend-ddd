import { Router, RequestHandler } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { GetOrdersUseCase } from '../../Application/getOrdersUseCase'
import { GetOrderByIdUseCase } from '../../Application/getOrderByIdUseCase'
import { GetOrdersByCustomerId } from '../../Application/getOrdersByCustomerIdUseCase'
import { CreateOrderUseCase } from '../../Application/createOrderUseCase'
import { UpdateOrderByIdUseCase } from '../../Application/updateOrderByIdUseCase'
import { OrderController } from '../controller/order.controller'
import { adminTokenMiddleware } from '../../../shared/middlewares/verifyToken.middleware'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const getOrders = new GetOrdersUseCase(prismaRepository)
const getOrderById = new GetOrderByIdUseCase(prismaRepository)
const getOrdersByCustomerId = new GetOrdersByCustomerId(prismaRepository)
const createOrder = new CreateOrderUseCase(prismaRepository)
const updateOrderById = new UpdateOrderByIdUseCase(prismaRepository)

// controllers
const orderController = new OrderController(
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  updateOrderById
)

// routes
router.get('/', orderController.getOrders as RequestHandler)
router.get('/:id', orderController.getOrderById as RequestHandler)
router.get('/customer/:id', orderController.getOrdersByCustomerId as RequestHandler)
router.post('/', orderController.createOrder as RequestHandler)
router.put('/:id', adminTokenMiddleware as RequestHandler, orderController.updateOrderById as RequestHandler)

export default router
