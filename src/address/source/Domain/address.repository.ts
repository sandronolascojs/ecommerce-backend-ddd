import { AddressEntity } from './address.entity'

export interface AddressRepository {
  createAddress: (customerId: string, address: AddressEntity) => Promise<AddressEntity | null>
  getAddressById: (id: string) => Promise<AddressEntity | null>
  getAddresses: () => Promise<AddressEntity[] | null>
  getAddressesByCustomerId: (customerId: string) => Promise<AddressEntity[] | null>
  updateAddressById: (id: string, { phone, address, city, state, postalCode, country }: AddressEntity) => Promise<AddressEntity | null>
  deleteAddressById: (id: string) => Promise<AddressEntity | null>
}
