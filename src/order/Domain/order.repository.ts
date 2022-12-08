import { OrderEntity } from './order.entity'

export interface OrderRepository {
  createOrder: ({ customerId, total, status, orderAddressId }: OrderEntity) => Promise<OrderEntity | null>
  getOrders: () => Promise<OrderEntity[] | null>
  getOrdersByCustomerId: (customerId: string) => Promise<OrderEntity[] | null>
  getOrderById: (id: string) => Promise<OrderEntity | null>
  updateOrderById: (id: string, { customerId, total, status, orderAddressId }: OrderEntity) => Promise<OrderEntity | null>
}
