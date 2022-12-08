import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class GetOrderItemsUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (): Promise<OrderItemEntity[] | null> {
    const orderItems = await this.orderItemRepository.getOrderItems()
    return orderItems
  }
}
