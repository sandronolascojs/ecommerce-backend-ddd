import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class GetOrderItemsByOrderIdUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (orderId: string): Promise<OrderItemEntity[] | null> {
    const orderItems = await this.orderItemRepository.getOrderItemsByOrderId(orderId)
    return orderItems
  }
}
