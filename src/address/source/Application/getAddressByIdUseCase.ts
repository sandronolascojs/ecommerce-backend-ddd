import { AddressEntity } from '../Domain/address.entity'
import { AddressRepository } from '../Domain/address.repository'

export class GetAddressByIdUseCase {
  private readonly addressRepository: AddressRepository

  constructor (customerRepository: AddressRepository) {
    this.addressRepository = customerRepository
  }

  async execute (id: string): Promise<AddressEntity | null> {
    const address = await this.addressRepository.getAddressById(id)
    return address
  }
}
