import { client } from '../db/prisma.db'
import { AdministratorRepository } from '../../Domain/administrator.repository'
import { AdministratorEntity } from '../../Domain/administrator.entity'

export class PrismaRepository implements AdministratorRepository {
  public getAdministrators = async (): Promise<AdministratorEntity[] | null> => {
    const administrators = await client.administrator.findMany()

    if (administrators.length === 0) return null

    return administrators
  }

  public createAdministrator = async ({ firstname, lastname, email, password, role, status }: AdministratorEntity): Promise<AdministratorEntity | null> => {
    const findAdministrator = await this.getAdministratorByEmail(email)

    if (findAdministrator !== null) return null

    const administratorCreated = await client.administrator.create({
      data: { firstname, lastname, email, password, role, status }
    })

    return administratorCreated
  }

  public async getAdministratorById (id: string): Promise<AdministratorEntity | null> {
    const administrator = await client.administrator.findUnique({
      where: {
        id
      }
    })

    if (administrator === null) return null

    return administrator
  }

  public getAdministratorByEmail = async (email: string): Promise<AdministratorEntity | null> => {
    const administrator = await client.administrator.findUnique({
      where: {
        email
      }
    })

    if (administrator === null) return null

    return administrator
  }

  public updateAdministratorById = async (id: string, administrator: AdministratorEntity): Promise<AdministratorEntity | null> => {
    const findAdministrator = this.getAdministratorById(id)

    if (findAdministrator === null) return null

    const administratorUpdated = await client.administrator.update({
      where: {
        id
      },
      data: administrator
    })

    return administratorUpdated
  }

  public deleteAdministratorById = async (id: string): Promise<AdministratorEntity | null> => {
    const findAdministrator = this.getAdministratorById(id)

    if (findAdministrator === null) return null

    const administratorDeleted = await client.administrator.delete({
      where: {
        id
      }
    })

    return administratorDeleted
  }
}
