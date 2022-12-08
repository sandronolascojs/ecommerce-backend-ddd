import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class GetOrderItemByIdUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (id: string): Promise<OrderItemEntity | null> {
    const orderItem = await this.orderItemRepository.getOrderItemById(id)
    return orderItem
  }
}
