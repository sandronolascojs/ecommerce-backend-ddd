import { OrderRepository } from '../Domain/order.repository'
import { OrderEntity } from '../Domain/order.entity'

export class CreateOrderUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute ({ customerId, total, status, orderAddressId }: OrderEntity): Promise<OrderEntity | null> {
    const order = await this.orderRepository.createOrder({ customerId, total, status, orderAddressId })
    return order
  }
}
