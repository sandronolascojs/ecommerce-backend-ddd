import { Request, Response } from 'express'
import { CreateOrderItemUseCase } from '../../Application/createOrderItemUseCase'
import { GetOrderItemsUseCase } from '../../Application/getOrderItemsUseCase'
import { GetOrderItemByIdUseCase } from '../../Application/getOrderItemByIdUseCase'
import { GetOrderItemsByOrderIdUseCase } from '../../Application/getOrderItemsByOrderIdUseCase'
import { DeleteOrderItemByIdUseCase } from '../../Application/deleteOrderItemByIdUseCase'
import { UpdateOrderItemByIdUseCase } from '../../Application/updateOrderByIdItemUseCase'
import { OrderItemEntity } from '../../Domain/orderItem.entity'
import { HttpResponse } from '../../../shared/utils/http.response'

export class OrderItemController {
  constructor (
    private readonly createOrderItemUseCase: CreateOrderItemUseCase,
    private readonly getOrderItemsUseCase: GetOrderItemsUseCase,
    private readonly getOrderItemByIdUseCase: GetOrderItemByIdUseCase,
    private readonly getOrderItemsByOrderIdUseCase: GetOrderItemsByOrderIdUseCase,
    private readonly updateOrderItemByIdUseCase: UpdateOrderItemByIdUseCase,
    private readonly deleteOrderItemByIdUseCase: DeleteOrderItemByIdUseCase
  ) {}

  public async createOrderItem (request: Request, response: Response): Promise<Response<OrderItemEntity>> {
    const { orderId, productId, quantity } = request.body

    const orderItem = await this.createOrderItemUseCase.execute({ orderId, productId, quantity })

    return new HttpResponse().CREATED(response, orderItem)
  }

  public async getOrderItems (request: Request, response: Response): Promise<Response<OrderItemEntity[] | null>> {
    const orderItems = await this.getOrderItemsUseCase.execute()

    if (orderItems === null) return new HttpResponse().NOT_FOUND(response, 'Order items not found')

    return new HttpResponse().OK(response, orderItems)
  }

  public async getOrderItemById (request: Request, response: Response): Promise<Response<OrderItemEntity | null>> {
    const { id } = request.params

    const orderItem = await this.getOrderItemByIdUseCase.execute(id)

    if (orderItem === null) return new HttpResponse().NOT_FOUND(response, 'Order item not found')

    return new HttpResponse().OK(response, orderItem)
  }

  public async getOrderItemsByOrderId (request: Request, response: Response): Promise<Response<OrderItemEntity[] | null>> {
    const { orderId } = request.params

    const orderItems = await this.getOrderItemsByOrderIdUseCase.execute(orderId)

    if (orderItems === null) return new HttpResponse().NOT_FOUND(response, 'Order items not found')

    return new HttpResponse().OK(response, orderItems)
  }

  public async updateOrderItemById (request: Request, response: Response): Promise<Response<OrderItemEntity | null>> {
    const { id } = request.params
    const { orderId, productId, quantity } = request.body

    const orderItem = await this.updateOrderItemByIdUseCase.execute(id, { orderId, productId, quantity })

    if (orderItem === null) return new HttpResponse().NOT_FOUND(response, 'Order item not found')

    return new HttpResponse().OK(response, orderItem)
  }

  public async deleteOrderItemById (request: Request, response: Response): Promise<Response<OrderItemEntity | null>> {
    const { id } = request.params

    const orderItem = await this.deleteOrderItemByIdUseCase.execute(id)

    if (orderItem === null) return new HttpResponse().NOT_FOUND(response, 'Order item not found')

    return new HttpResponse().OK(response)
  }
}
