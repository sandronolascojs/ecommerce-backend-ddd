import { OrderItemRepository } from '../Domain/orderItem.repository'
import { OrderItemEntity } from '../Domain/orderItem.entity'

export class UpdateOrderItemByIdUseCase {
  public orderItemRepository: OrderItemRepository

  constructor (orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository
  }

  public async execute (id: string, { orderId, productId, quantity }: OrderItemEntity): Promise<OrderItemEntity | null> {
    const orderItemUpdated = await this.orderItemRepository.updateOrderItemById(id, { orderId, productId, quantity })
    return orderItemUpdated
  }
}
