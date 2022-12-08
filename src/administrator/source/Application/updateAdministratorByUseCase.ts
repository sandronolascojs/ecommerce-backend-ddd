import { AdministratorRepository } from '../Domain/administrator.repository'
import { AdministratorEntity } from '../Domain/administrator.entity'

export class UpdateAdministratorByIdUseCase {
  public administratorRepository: AdministratorRepository

  constructor (administratorRepository: AdministratorRepository) {
    this.administratorRepository = administratorRepository
  }

  async execute (id: string, administrator: AdministratorEntity): Promise<AdministratorEntity | null> {
    const administratorUpdated = await this.administratorRepository.updateAdministratorById(id, administrator)
    return administratorUpdated
  }
}
