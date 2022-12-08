import { CustomerRepository } from '../Domain/customer.repository'
import { CustomerEntity } from '../Domain/customer.entity'

export class UpdateCustomerByIdUseCase {
  public customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public execute = async (id: string, { firstname, lastname, email, password }: CustomerEntity, newPassword?: string): Promise<CustomerEntity | null> => {
    const customer = await this.customerRepository.updateCustomerById(id, { firstname, lastname, email, password }, newPassword)
    return customer
  }
}
