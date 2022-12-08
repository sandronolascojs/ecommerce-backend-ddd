import { AdministratorRepository } from '../Domain/administrator.repository'
import { AdministratorEntity } from '../Domain/administrator.entity'

export class GetAdministratorByEmailUseCase {
  public administratorRepository: AdministratorRepository

  constructor (administratorRepository: AdministratorRepository) {
    this.administratorRepository = administratorRepository
  }

  async execute (email: string): Promise<AdministratorEntity | null> {
    const administrator = await this.administratorRepository.getAdministratorByEmail(email)
    return administrator
  }
}
