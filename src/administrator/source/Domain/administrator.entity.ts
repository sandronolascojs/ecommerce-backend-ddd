
export enum AdministratorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AdministratorRole {
  ADMIN = 'administrator',
  EMPLOYEE = 'employee'
}

export interface AdministratorEntity {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
  status: string
}
