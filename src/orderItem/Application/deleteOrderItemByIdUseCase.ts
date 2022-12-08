import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class DeleteOrderItemByIdUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (id: string): Promise<OrderItemEntity | null> {
    const orderItemDeleted = await this.orderItemRepository.deleteOrderItemById(id)
    return orderItemDeleted
  }
}
