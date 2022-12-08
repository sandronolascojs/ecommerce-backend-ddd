import { AdministratorRepository } from '../Domain/administrator.repository'
import { AdministratorEntity } from '../Domain/administrator.entity'

export class CreateAdministratorUseCase {
  public administratorRepostory: AdministratorRepository

  constructor (administratorRepostory: AdministratorRepository) {
    this.administratorRepostory = administratorRepostory
  }

  async execute (administrator: AdministratorEntity): Promise<AdministratorEntity> {
    const administratorCreated = await this.administratorRepostory.createAdministrator(administrator)
    return administratorCreated
  }
}
