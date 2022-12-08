import { CustomerEntity } from './customer.entity'

export class CustomerValue implements CustomerEntity {
  public firstname: string
  public lastname: string
  public email: string
  public password: string

  constructor ({ firstname, lastname, email, password }: CustomerEntity) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
  }
}
