import { AdministratorRepository } from '../Domain/administrator.repository'
import { AdministratorEntity } from '../Domain/administrator.entity'

export class DeleteAdministratorByIdUseCase {
  public administratorRepository: AdministratorRepository

  constructor (administratorRepository: AdministratorRepository) {
    this.administratorRepository = administratorRepository
  }

  async execute (id: string): Promise<AdministratorEntity | null> {
    const deletedAdministrator = await this.administratorRepository.deleteAdministratorById(id)
    return deletedAdministrator
  }
}
