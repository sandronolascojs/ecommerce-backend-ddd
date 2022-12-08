import { OrderEntity } from '../Domain/order.entity'
import { OrderRepository } from '../Domain/order.repository'

export class GetOrdersUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute (): Promise<OrderEntity[] | null> {
    const order = await this.orderRepository.getOrders()
    return order
  }
}
