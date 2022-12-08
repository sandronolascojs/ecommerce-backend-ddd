import { CustomerEntity } from '../Domain/customer.entity'
import { CustomerRepository } from '../Domain/customer.repository'

export class DeleteCustomerByIdUseCase {
  public customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async (id: string): Promise<CustomerEntity | null> => {
    const customer = await this.customerRepository.deleteCustomerById(id)
    return customer
  }
}
