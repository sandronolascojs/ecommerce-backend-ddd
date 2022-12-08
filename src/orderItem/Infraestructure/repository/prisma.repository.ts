import { client } from '../db/prisma.db'
import { OrderItemRepository } from '../../Domain/orderItem.repository'
import { OrderItemEntity } from '../../Domain/orderItem.entity'

export class PrismaRepository implements OrderItemRepository {
  public async getOrderItems (): Promise<OrderItemEntity[] | null> {
    const orderItems = await client.orderItem.findMany({
      include: {
        order: true
      }
    })
    return orderItems
  }

  public async getOrderItemsByOrderId (orderId: string): Promise<OrderItemEntity[] | null> {
    const orderItems = await client.orderItem.findMany({
      where: {
        orderId
      },
      include: {
        order: true
      }
    })
    return orderItems
  }

  public async getOrderItemById (id: string): Promise<OrderItemEntity | null> {
    const orderItem = await client.orderItem.findUnique({
      where: {
        id
      },
      include: {
        order: true
      }
    })
    return orderItem
  }

  public async createOrderItem ({ orderId, productId, quantity }: OrderItemEntity): Promise<OrderItemEntity | null> {
    const orderItemCreated = await client.orderItem.create({
      data: { orderId, productId, quantity }
    })

    return orderItemCreated
  }

  public async updateOrderItemById (id: string, { orderId, productId, quantity }: OrderItemEntity): Promise<OrderItemEntity | null> {
    const orderItemUpdated = await client.orderItem.update({
      where: {
        id
      },
      data: { orderId, productId, quantity }
    })

    return orderItemUpdated
  }

  public async deleteOrderItemById (id: string): Promise<OrderItemEntity | null> {
    const findOrderItem = this.getOrderItemById(id)

    if (findOrderItem === null) return null

    const orderItemDeleted = await client.orderItem.delete({
      where: {
        id
      }
    })

    return orderItemDeleted
  }
}
