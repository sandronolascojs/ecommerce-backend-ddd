import { OrderItemEntity } from './orderItem.entity'

export interface OrderItemRepository {
  createOrderItem: ({ orderId, productId, quantity }: OrderItemEntity) => Promise<OrderItemEntity | null>
  getOrderItemById: (id: string) => Promise<OrderItemEntity | null>
  getOrderItems: () => Promise<OrderItemEntity[] | null>
  getOrderItemsByOrderId: (orderId: string) => Promise<OrderItemEntity[] | null>
  updateOrderItemById: (id: string, { orderId, productId, quantity }: OrderItemEntity) => Promise<OrderItemEntity | null>
  deleteOrderItemById: (id: string) => Promise<OrderItemEntity | null>
}
