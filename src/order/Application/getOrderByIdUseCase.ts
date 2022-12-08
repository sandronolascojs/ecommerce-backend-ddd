import { OrderRepository } from '../Domain/order.repository'
import { OrderEntity } from '../Domain/order.entity'

export class GetOrderByIdUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute (id: string): Promise<OrderEntity | null> {
    const order = await this.orderRepository.getOrderById(id)
    return order
  }
}
