import { AddressEntity } from '../Domain/address.entity'
import { AddressRepository } from '../Domain/address.repository'

export class DeleteAddressByIdUseCase {
  private readonly addressRepository: AddressRepository

  constructor (addressRepository: AddressRepository) {
    this.addressRepository = addressRepository
  }

  async execute (id: string): Promise<AddressEntity | null> {
    const deletedAddress = await this.addressRepository.deleteAddressById(id)
    return deletedAddress
  }
}
