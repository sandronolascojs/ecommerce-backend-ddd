import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class CreateOrderItemUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (orderItem: OrderItemEntity): Promise<OrderItemEntity | null> {
    const orderItemCreated = await this.orderItemRepository.createOrderItem(orderItem)
    return orderItemCreated
  }
}
