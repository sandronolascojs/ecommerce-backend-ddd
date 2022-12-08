import { AddressRepository } from '../Domain/address.repository'
import { AddressEntity } from '../Domain/address.entity'

export class GetAddressesUseCase {
  private readonly addressRepository: AddressRepository

  constructor (customerRepository: AddressRepository) {
    this.addressRepository = customerRepository
  }

  async execute (): Promise<AddressEntity[] | null> {
    const addresses = await this.addressRepository.getAddresses()
    return addresses
  }
}
