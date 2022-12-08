import { CustomerRepository } from '../Domain/customer.repository'
import { CustomerEntity } from '../Domain/customer.entity'

export class GetCustomerByIdUseCase {
  public customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async (id: string): Promise<CustomerEntity | null> => {
    const customer = await this.customerRepository.getCustomerById(id)
    return customer
  }
}
