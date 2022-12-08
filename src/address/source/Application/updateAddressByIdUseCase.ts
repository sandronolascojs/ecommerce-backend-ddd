import { AddressEntity } from '../Domain/address.entity'
import { AddressRepository } from '../Domain/address.repository'

export class UpdateAddressByIdUseCase {
  private readonly addressRepository: AddressRepository

  constructor (addressRepository: AddressRepository) {
    this.addressRepository = addressRepository
  }

  async execute (id: string, address: AddressEntity): Promise<AddressEntity | null> {
    const updatedAddress = await this.addressRepository.updateAddressById(id, address)
    return updatedAddress
  }
}
