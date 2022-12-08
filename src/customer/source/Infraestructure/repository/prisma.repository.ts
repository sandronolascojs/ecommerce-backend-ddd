import { client } from '../db/prisma.db'
import { encryptPassword, comparePassword } from '../../../../shared/utils/encryptPassword.shared'
import { CustomerRepository } from '../../Domain/customer.repository'
import { CustomerEntity } from '../../Domain/customer.entity'

export class PrismaRepository implements CustomerRepository {
  public createCustomer = async (customer: CustomerEntity): Promise<CustomerEntity | null> => {
    const findCustomer = await this.getCustomerByDetails(customer.email)

    if (findCustomer === null) {
      const hash = await encryptPassword(customer.password)
      const newCustomer = await client.customer.create({
        data: {
          ...customer,
          password: hash
        }
      })

      return newCustomer
    }

    return null
  }

  public getCustomerById = async (id: string): Promise<CustomerEntity | null> => {
    const customer = client.customer.findUnique({
      where: {
        id
      }
    })

    return await (customer ?? null)
  }

  public getCustomers = async (): Promise<CustomerEntity[] | null> => {
    const customers = await client.customer.findMany()

    if (customers.length === 0) {
      return null
    }

    return customers ?? null
  }

  public getCustomerByDetails = async (email: string): Promise<CustomerEntity | null> => {
    const customer = await client.customer.findFirst({
      where: {
        email
      }
    })

    return customer ?? null
  }

  public updateCustomerById = async (id: string, { firstname, lastname, email, password }: CustomerEntity, newPassword?: string): Promise<CustomerEntity | null> => {
    const findCustomer = await this.getCustomerById(id)

    if (findCustomer === null) {
      return null
    }

    if (newPassword !== undefined) {
      const isMatch = await comparePassword(password, findCustomer.password)
      if (!isMatch) {
        return null
      }

      const hash = await encryptPassword(newPassword)
      const customer = await client.customer.update({
        where: {
          id
        },
        data: {
          firstname,
          lastname,
          email,
          password: hash
        }
      })

      return customer ?? null
    }

    const customer = await client.customer.update({
      where: {
        id
      },
      data: {
        firstname,
        lastname,
        email
      }
    })

    return customer ?? null
  }

  public deleteCustomerById = async (id: string): Promise<CustomerEntity | null> => {
    const findCustomer = await this.getCustomerById(id)

    if (findCustomer !== null) {
      const customer = await client.customer.delete({
        where: {
          id
        }
      })

      return customer ?? null
    }

    return null
  }
}
