import { AdministratorEntity, AdministratorRole, AdministratorStatus } from './administrator.entity'

export class AdministratorValue implements AdministratorEntity {
  firstname: string
  lastname: string
  email: string
  password: string
  role: AdministratorRole
  status: AdministratorStatus

  constructor ({ firstname, lastname, email, password, role, status }: AdministratorEntity) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.role = role
    this.status = status
  }
}
