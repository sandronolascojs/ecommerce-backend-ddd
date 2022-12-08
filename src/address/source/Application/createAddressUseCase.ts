import { AddressRepository } from '../Domain/address.repository'
import { AddressEntity } from '../Domain/address.entity'

export class CreateAddressUseCase {
  private readonly addressRepository: AddressRepository

  constructor (customerRepository: AddressRepository) {
    this.addressRepository = customerRepository
  }

  async execute (customerId: string, address: AddressEntity): Promise<AddressEntity | null> {
    const newAddress = await this.addressRepository.createAddress(customerId, address)
    return newAddress
  }
}
