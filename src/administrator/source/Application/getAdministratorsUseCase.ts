import { AdministratorRepository } from '../Domain/administrator.repository'
import { AdministratorEntity } from '../Domain/administrator.entity'

export class GetAdministratorsUseCase {
  public administratorRepository: AdministratorRepository

  constructor (administratorRepository: AdministratorRepository) {
    this.administratorRepository = administratorRepository
  }

  public async execute (): Promise<AdministratorEntity[] | null> {
    const administrators = await this.administratorRepository.getAdministrators()
    return administrators
  }
}
