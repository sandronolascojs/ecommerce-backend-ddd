import { AuthenticationRepository } from '../Domain/authentication.repository'
import { AuthenticationEntity } from '../Domain/authentication.entity'

export class CustomerRegistrationUseCase {
  public authenticationRepository: AuthenticationRepository

  constructor (authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository
  }

  public async execute (email: string, password: string, firstname: string, lastname: string): Promise<AuthenticationEntity | null> {
    const authenticationEntity = await this.authenticationRepository.register(email, password, firstname, lastname)
    return authenticationEntity
  }
}
