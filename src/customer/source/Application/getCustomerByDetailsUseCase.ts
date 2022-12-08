import { CustomerRepository } from '../Domain/customer.repository'
import { CustomerEntity } from '../Domain/customer.entity'

export class GetCustomerByDetailsUseCase {
  public customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async (email: string): Promise<CustomerEntity | null> => {
    const customer = await this.customerRepository.getCustomerByDetails(email)
    return customer
  }
}
