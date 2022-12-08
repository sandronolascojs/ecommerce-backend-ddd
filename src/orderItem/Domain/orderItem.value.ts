import { OrderItemEntity } from './orderItem.entity'

export class OrderItemValue implements OrderItemEntity {
  public orderId: string
  public productId: string
  public quantity: number

  constructor ({ orderId, productId, quantity }: OrderItemEntity) {
    this.orderId = orderId
    this.productId = productId
    this.quantity = quantity
  }
}
