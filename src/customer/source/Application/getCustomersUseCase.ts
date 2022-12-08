import { CustomerRepository } from '../Domain/customer.repository'
import { CustomerEntity } from '../Domain/customer.entity'

export class GetCustomersUseCase {
  public customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async (): Promise<CustomerEntity[] | null> => {
    const customers = await this.customerRepository.getCustomers()
    return customers
  }
}
