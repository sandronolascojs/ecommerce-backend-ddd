import { CustomerEntity } from './customer.entity'

export interface CustomerRepository {
  createCustomer: (customer: CustomerEntity) => Promise<CustomerEntity | null>
  getCustomerById: (id: string) => Promise<CustomerEntity | null>
  getCustomerByDetails: (email: string) => Promise<CustomerEntity | null>
  getCustomers: () => Promise<CustomerEntity[] | null>
  deleteCustomerById: (id: string) => Promise<CustomerEntity | null>
  updateCustomerById: (id: string, { firstname, lastname, email, password }: CustomerEntity, newPassword?: string) => Promise<CustomerEntity | null>
}
