import { CustomerRepository } from '../Domain/customer.repository'
import { CustomerEntity } from '../Domain/customer.entity'

export class CreateCustomerUseCase {
  public customerRepository: CustomerRepository
  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async ({ firstname, lastname, email, password }: CustomerEntity): Promise<CustomerEntity | null> => {
    const customer = await this.customerRepository.createCustomer({ firstname, lastname, email, password })
    return customer
  }
}
