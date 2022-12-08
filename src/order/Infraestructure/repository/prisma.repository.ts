import { client } from '../db/prisma.db'
import { OrderRepository } from '../../Domain/order.repository'

export class PrismaRepository implements OrderRepository {
  public async createOrder ({ customerId, total, status, orderAddressId }: any): Promise<any | null> {
    const order = await client.order.create({
      data: {
        customerId,
        total,
        status,
        orderAddressId
      }
    })
    return order
  }

  public async getOrderById (id: string): Promise<any | null> {
    const order = await client.order.findUnique({
      where: {
        id
      },
      include: {
        orderAddress: true,
        orderItems: true
      }
    })

    if (order === null) return null

    return order
  }

  public async getOrdersByCustomerId (customerId: string): Promise<any[] | null> {
    const orders = await client.order.findMany({
      where: {
        customerId
      },
      include: {
        orderAddress: true,
        orderItems: true
      }
    })
    return orders
  }

  public async getOrders (): Promise<any[] | null> {
    const orders = await client.order.findMany({
      include: {
        orderAddress: true,
        orderItems: true
      }
    })

    if (orders.length === 0) return null

    return orders
  }

  public async updateOrderById (id: string, { customerId, total, status, orderAddressId }: any): Promise<any | null> {
    const findOrder = this.getOrderById(id)

    if (findOrder === null) return null

    const order = await client.order.update({
      where: {
        id
      },
      data: {
        customerId,
        total,
        status,
        orderAddressId
      }
    })

    return order
  }
}
