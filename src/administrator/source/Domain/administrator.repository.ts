import { AdministratorEntity } from './administrator.entity'

export interface AdministratorRepository {
  createAdministrator: ({ firstname, lastname, email, password, role, status }: AdministratorEntity) => Promise<AdministratorEntity | null>
  getAdministrators: () => Promise<AdministratorEntity[] | null>
  getAdministratorByEmail: (email: string) => Promise<AdministratorEntity | null>
  getAdministratorById: (id: string) => Promise<AdministratorEntity | null>
  updateAdministratorById: (id: string, { firstname, lastname, email, password, role, status }: AdministratorEntity) => Promise<AdministratorEntity | null>
  deleteAdministratorById: (id: string) => Promise<AdministratorEntity | null>
}
