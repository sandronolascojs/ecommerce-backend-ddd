import { CreateAddressUseCase } from '../../Application/createAddressUseCase'
import { GetAddresesByCustomerIdUseCase } from '../../Application/getAddressesByCustomerIdUseCase'
import { GetAddressesUseCase } from '../../Application/getAddressesUseCase'
import { UpdateAddressByIdUseCase } from '../../Application/updateAddressByIdUseCase'
import { DeleteAddressByIdUseCase } from '../../Application/deleteAddressByIdUseCase'
import { GetAddressByIdUseCase } from '../../Application/getAddressByIdUseCase'
import { AddressEntity } from '../../Domain/address.entity'
import { Request, Response } from 'express'
import { HttpResponse } from '../../../../shared/utils/http.response'

export class AddrressController {
  constructor (
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly getAddressByIdUseCase: GetAddressByIdUseCase,
    private readonly getAddressesUseCase: GetAddressesUseCase,
    private readonly getAddressesByCustomerIdUseCase: GetAddresesByCustomerIdUseCase,
    private readonly updateAddressByIdUseCase: UpdateAddressByIdUseCase,
    private readonly deleteAddressByIdUseCase: DeleteAddressByIdUseCase
  ) { }

  public createAddress = async (request: Request, response: Response): Promise<Response<AddressEntity | null>> => {
    const { customer } = request.body
    const {
      phone,
      address,
      city,
      state,
      postalCode,
      country
    } = request.body

    const customerId = customer.id

    await this.createAddressUseCase.execute(customerId, { phone, address, city, state, postalCode, country })

    return new HttpResponse().CREATED(response, { phone, address, city, state, postalCode, country })
  }

  public getAddressById = async (request: Request, response: Response): Promise<Response<AddressEntity | null>> => {
    const { id } = request.params
    const address = await this.getAddressByIdUseCase.execute(id)

    if (address === null) return new HttpResponse().NOT_FOUND(response, 'address not found')

    return new HttpResponse().OK(response, address)
  }

  public getAddresses = async (_request: Request, response: Response): Promise<Response<AddressEntity[] | null>> => {
    const addresses = await this.getAddressesUseCase.execute()

    if (addresses === null) return new HttpResponse().NOT_FOUND(response, 'addresses not found')

    return new HttpResponse().OK(response, addresses)
  }

  public getAddressesByCustomerId = async (request: Request, response: Response): Promise<Response<AddressEntity[] | null>> => {
    const { customer } = request.body
    const { customerId } = request.params

    if (customer.id !== customerId) return new HttpResponse().UNAUTHORIZED(response, 'unauthorized')

    const addresses = await this.getAddressesByCustomerIdUseCase.execute(customerId)
    if (addresses === null) return new HttpResponse().NOT_FOUND(response, 'addresses not found')

    return new HttpResponse().OK(response, addresses)
  }

  public updateAddressById = async (request: Request, response: Response): Promise<Response<AddressEntity | null>> => {
    const { id } = request.params
    const { phone, address, city, state, postalCode, country } = request.body

    const updatedAddress = await this.updateAddressByIdUseCase.execute(id, { phone, address, city, state, postalCode, country })

    if (updatedAddress === null) return new HttpResponse().NOT_FOUND(response, 'address not found')

    return new HttpResponse().OK(response, updatedAddress)
  }

  public deleteAddressById = async (request: Request, response: Response): Promise<Response<AddressEntity | null>> => {
    const { id } = request.params
    const deletedAddress = await this.deleteAddressByIdUseCase.execute(id)

    if (deletedAddress === null) return new HttpResponse().NOT_FOUND(response, 'address not found')

    return new HttpResponse().OK(response)
  }
}
