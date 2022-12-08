import { OrderEntity } from './order.entity'

export class OrderValue implements OrderEntity {
  public customerId: string
  public total: Int16Array
  public status: string
  public orderAddressId: string

  constructor ({ customerId, total, status, orderAddressId }: OrderEntity) {
    this.customerId = customerId
    this.total = total
    this.status = status
    this.orderAddressId = orderAddressId
  }
}
