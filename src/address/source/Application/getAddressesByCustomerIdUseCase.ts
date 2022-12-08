import { AddressRepository } from '../Domain/address.repository'
import { AddressEntity } from '../Domain/address.entity'

export class GetAddresesByCustomerIdUseCase {
  public addressRepository: AddressRepository

  constructor (addressRepository: AddressRepository) {
    this.addressRepository = addressRepository
  }

  async execute (customerId: string): Promise<AddressEntity[] | null> {
    const addresses = await this.addressRepository.getAddressesByCustomerId(customerId)
    return addresses
  }
}
