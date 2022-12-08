import { OrderEntity } from '../Domain/order.entity'
import { OrderRepository } from '../Domain/order.repository'

export class UpdateOrderByIdUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute (id: string, { customerId, total, status, orderAddressId }: OrderEntity): Promise<OrderEntity | null> {
    const order = await this.orderRepository.updateOrderById(id, { customerId, total, status, orderAddressId })
    return order
  }
}
