import { AdministratorEntity } from '../Domain/administrator.entity'
import { AdministratorRepository } from '../Domain/administrator.repository'

export class GetAdministratorByIdUseCase {
  public administratorRepository: AdministratorRepository

  constructor (administratorRepository: AdministratorRepository) {
    this.administratorRepository = administratorRepository
  }

  async execute (id: string): Promise<AdministratorEntity | null> {
    const administrator = await this.administratorRepository.getAdministratorById(id)
    return administrator
  }
}
