import { OrderEntity } from '../Domain/order.entity'
import { OrderRepository } from '../Domain/order.repository'

export class GetOrdersByCustomerId {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute (customerId: string): Promise<OrderEntity[] | null> {
    const order = await this.orderRepository.getOrdersByCustomerId(customerId)
    return order
  }
}
