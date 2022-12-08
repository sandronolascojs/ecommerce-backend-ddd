import { AddressEntity } from './address.entity'

export class AddressValue implements AddressEntity {
  public customerId: string
  public phone: string
  public address: string
  public city: string
  public state: string
  public postalCode: string
  public country: string

  constructor (customerId: string, { phone, address, city, state, postalCode, country }: AddressEntity) {
    this.customerId = customerId
    this.phone = phone
    this.address = address
    this.city = city
    this.state = state
    this.postalCode = postalCode
    this.country = country
  }
}
