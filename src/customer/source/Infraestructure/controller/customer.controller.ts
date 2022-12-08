import { Request, Response } from 'express'
import { CustomerEntity } from '../../Domain/customer.entity'
import { GetCustomersUseCase } from '../../Application/getCustomersUseCase'
import { CreateCustomerUseCase } from '../../Application/createCustomerUseCase'
import { GetCustomerByIdUseCase } from '../../Application/getCustomerByIdUseCase'
import { GetCustomerByDetailsUseCase } from '../../Application/getCustomerByDetailsUseCase'
import { UpdateCustomerByIdUseCase } from '../../Application/updateCustomerByIdUseCase'
import { DeleteCustomerByIdUseCase } from '../../Application/deleteCustomerByIdUseCase'
import { HttpResponse } from '../../../../shared/utils/http.response'

export class CustomerController {
  constructor (
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomersUseCase: GetCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly getCustomerByDetailsUseCase: GetCustomerByDetailsUseCase,
    private readonly updateCustomerByIdUseCase: UpdateCustomerByIdUseCase,
    private readonly deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase
  ) {}

  public createCustomer = async (_request: Request, response: Response): Promise<Response<CustomerEntity>> => {
    const customer = await this.createCustomerUseCase.execute(_request.body)

    if (customer === null) {
      return new HttpResponse().CONFLICT(response, 'customer not created')
    }

    return new HttpResponse().CREATED(response, {
      customer: {
        email: customer?.email,
        firstname: customer?.firstname
      }
    })
  }

  public getCustomerById = async (request: Request, response: Response): Promise<Response<CustomerEntity | null>> => {
    const customer = await this.getCustomerByIdUseCase.execute(request.params.id)

    if (customer === null) {
      return new HttpResponse().NOT_FOUND(response, 'customer not found')
    }

    return new HttpResponse().OK(response, {
      customer: {
        email: customer?.email,
        firstname: customer?.firstname
      }
    })
  }

  public getCustomerByDetails = async (request: Request, response: Response): Promise<Response<CustomerEntity | null>> => {
    const { email } = request.body

    const customer = await this.getCustomerByDetailsUseCase.execute(email)

    if (customer === null) {
      return new HttpResponse().NOT_FOUND(response, 'customer not found')
    }

    return new HttpResponse().OK(response, {
      customer: {
        email: customer?.email,
        firstname: customer?.firstname,
        lastname: customer?.lastname
      }
    })
  }

  public getCustomers = async (_request: Request, response: Response): Promise<Response<CustomerEntity[] | null>> => {
    const customers = await this.getCustomersUseCase.execute()

    if (customers === null) {
      return new HttpResponse().NOT_FOUND(response, 'customers not found')
    }

    const customerMapper = customers?.map(customer => {
      return {
        fistname: customer.firstname,
        email: customer.email
      }
    })

    return new HttpResponse().OK(response, {
      customers: customerMapper
    })
  }

  public updateCustomerById = async (request: Request, response: Response): Promise<Response<CustomerEntity | null>> => {
    const { id } = request.params
    const { firstname, lastname, email, password, newPassword } = request.body

    const customer = await this.updateCustomerByIdUseCase.execute(id, { firstname, lastname, email, password }, newPassword)

    if (customer === null) {
      return new HttpResponse().NOT_FOUND(response, 'customer not found')
    }

    return new HttpResponse().OK(response)
  }

  public deleteCustomerById = async (request: Request, response: Response): Promise<Response<CustomerEntity | null>> => {
    const customer = await this.getCustomerByIdUseCase.execute(request.params.id)

    if (customer === null) {
      return new HttpResponse().NOT_FOUND(response, 'customer not found')
    }

    await this.deleteCustomerByIdUseCase.execute(request.params.id)

    return new HttpResponse().OK(response)
  }
}
