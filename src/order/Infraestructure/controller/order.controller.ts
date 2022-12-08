import { CreateOrderUseCase } from '../../Application/createOrderUseCase'
import { GetOrdersUseCase } from '../../Application/getOrdersUseCase'
import { GetOrderByIdUseCase } from '../../Application/getOrderByIdUseCase'
import { GetOrdersByCustomerId } from '../../Application/getOrdersByCustomerIdUseCase'
import { UpdateOrderByIdUseCase } from '../../Application/updateOrderByIdUseCase'
import { Request, Response } from 'express'
import { OrderEntity } from '../../Domain/order.entity'
import { HttpResponse } from '../../../shared/utils/http.response'

export class OrderController {
  constructor (
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly getOrdersByCustomerIdUseCase: GetOrdersByCustomerId,
    private readonly updateOrderByIdUseCase: UpdateOrderByIdUseCase
  ) {}

  public createOrder = async (request: Request, response: Response): Promise<Response<OrderEntity | null>> => {
    const { body } = request
    const order = await this.createOrderUseCase.execute(body)
    return new HttpResponse().CREATED(response, order)
  }

  public getOrders = async (_request: Request, response: Response): Promise<Response<OrderEntity[] | null>> => {
    const orders = await this.getOrdersUseCase.execute()
    if (orders === null) return new HttpResponse().NOT_FOUND(response, 'orders not found')
    return new HttpResponse().OK(response, orders)
  }

  public getOrderById = async (request: Request, response: Response): Promise<Response<OrderEntity | null>> => {
    const { id } = request.params
    const order = await this.getOrderByIdUseCase.execute(id)
    if (order === null) return new HttpResponse().NOT_FOUND(response, 'order not found')
    return new HttpResponse().OK(response, order)
  }

  public getOrdersByCustomerId = async (request: Request, response: Response): Promise<Response<OrderEntity[] | null>> => {
    const { customerId } = request.params
    const orders = await this.getOrdersByCustomerIdUseCase.execute(customerId)
    if (orders === null) return new HttpResponse().NOT_FOUND(response, 'orders not found')
    return new HttpResponse().OK(response, orders)
  }

  public updateOrderById = async (request: Request, response: Response): Promise<Response<OrderEntity | null>> => {
    const { id } = request.params
    const { body } = request
    const order = await this.updateOrderByIdUseCase.execute(id, body)
    if (order === null) return new HttpResponse().NOT_FOUND(response, 'order not found')
    return new HttpResponse().OK(response, order)
  }
}
