import { client } from '../db/prisma.db'
import { AddressRepository } from '../../Domain/address.repository'
import { AddressEntity } from '../../Domain/address.entity'

export class PrismaRepository implements AddressRepository {
  public createAddress = async (customerId: string, address: AddressEntity): Promise<AddressEntity | null> => {
    return await client.address.create({
      data: {
        ...address,
        customerId
      }
    })
  }

  public getAddressById = async (id: string): Promise<AddressEntity | null> => {
    const address = await client.address.findUnique({
      where: {
        id
      },
      include: {
        customer: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        }
      }
    })

    return address ?? null
  }

  public getAddresses = async (): Promise<AddressEntity[] | null> => {
    const addresses = await client.address.findMany({
      include: {
        customer: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        }
      }
    })

    if (addresses.length === 0) return null

    return addresses ?? null
  }

  public getAddressesByCustomerId = async (customerId: string): Promise<AddressEntity[] | null> => {
    const addresses = await client.address.findMany({
      where: {
        customerId
      }
    })

    if (addresses.length === 0) return null

    return addresses ?? null
  }

  public updateAddressById = async (id: string, address: AddressEntity): Promise<AddressEntity | null> => {
    const updatedAddress = await client.address.update({
      where: {
        id
      },
      data: {
        ...address
      }
    })

    return updatedAddress ?? null
  }

  public deleteAddressById = async (id: string): Promise<AddressEntity | null> => {
    const findAddress = await this.getAddressById(id)

    if (findAddress === null) return null

    const deletedAddress = await client.address.delete({
      where: {
        id
      }
    })

    return deletedAddress ?? null
  }
}
