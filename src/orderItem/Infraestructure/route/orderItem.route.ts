import { RequestHandler, Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CreateOrderItemUseCase } from '../../Application/createOrderItemUseCase'
import { GetOrderItemByIdUseCase } from '../../Application/getOrderItemByIdUseCase'
import { GetOrderItemsByOrderIdUseCase } from '../../Application/getOrderItemsByOrderIdUseCase'
import { GetOrderItemsUseCase } from '../../Application/getOrderItemsUseCase'
import { DeleteOrderItemByIdUseCase } from '../../Application/deleteOrderItemByIdUseCase'
import { OrderItemController } from '../controller/orderItem.controller'
import { UpdateOrderItemByIdUseCase } from '../../Application/updateOrderByIdItemUseCase'
import { adminTokenMiddleware } from '../../../shared/middlewares/verifyToken.middleware'

const router = Router()

// repository
const prismaRepository = new PrismaRepository()

// usecases
const createOrderItem = new CreateOrderItemUseCase(prismaRepository)
const getOrderItems = new GetOrderItemsUseCase(prismaRepository)
const getOrderItemById = new GetOrderItemByIdUseCase(prismaRepository)
const getOrderItemsByOrderId = new GetOrderItemsByOrderIdUseCase(prismaRepository)
const updateOrderItemById = new UpdateOrderItemByIdUseCase(prismaRepository)
const deleteOrderItemById = new DeleteOrderItemByIdUseCase(prismaRepository)

// controllers
const orderItemController = new OrderItemController(
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  updateOrderItemById,
  deleteOrderItemById
)

// routes
router.get('/', adminTokenMiddleware as RequestHandler, orderItemController.getOrderItems as RequestHandler)
router.get('/:id', adminTokenMiddleware as RequestHandler, orderItemController.getOrderItemById as RequestHandler)
router.get('/order/:orderId', adminTokenMiddleware as RequestHandler, orderItemController.getOrderItemsByOrderId as RequestHandler)
router.post('/', orderItemController.createOrderItem as RequestHandler)
router.put('/:id', adminTokenMiddleware as RequestHandler, orderItemController.updateOrderItemById as RequestHandler)
router.delete('/:id', adminTokenMiddleware as RequestHandler, orderItemController.deleteOrderItemById as RequestHandler)

export default router
