import { CustomerEntity } from '../../Domain/customer.entity'
import { CustomerRepository } from '../../Domain/customer.repository'

export class MockRepository implements CustomerRepository {
  private readonly customers: CustomerEntity[] = []

  public async createCustomer (customer: CustomerEntity): Promise<CustomerEntity> {
    this.customers.push(customer)
    return customer
  }

  public async getCustomerByDetails (email: string, phone: string): Promise<CustomerEntity | null> {
    const customer = this.customers.find(customer => customer.email === email || customer.phone === phone)
    return customer ?? null
  }

  public async getCustomerById (id: string): Promise<CustomerEntity | null> {
    const customer = this.customers.find(customer => customer.id === id)
    return customer ?? null
  }

  public async getCustomers (): Promise<CustomerEntity[] | null> {
    return this.customers ?? null
  }

  public async deleteCustomerById (id: string): Promise<CustomerEntity | null> {
    const customer = this.customers.find(customer => customer.id === id)
    if (customer === undefined) {
      return null
    }
    this.customers.splice(this.customers.indexOf(customer), 1)
    return customer
  }

  public async updateCustomerById (id: string, { firstname, lastname, email, phone, address, city, state, postalCode }: CustomerEntity): Promise<CustomerEntity | null> {
    const customer = this.customers.find(customer => customer.id === id)
    if (customer === undefined) {
      return null
    }
    customer.firstname = firstname
    customer.lastname = lastname
    customer.email = email
    customer.phone = phone
    customer.address = address
    customer.city = city
    customer.state = state
    customer.postalCode = postalCode
    return customer
  }
}
