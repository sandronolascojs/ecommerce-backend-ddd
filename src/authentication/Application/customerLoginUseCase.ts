import { AuthenticationRepository } from '../Domain/authentication.repository'
import { AuthenticationEntity } from '../Domain/authentication.entity'

export class CustomerLoginUseCase {
  public authenticationRepository: AuthenticationRepository

  constructor (authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository
  }

  public async execute (email: string, password: string): Promise<AuthenticationEntity | null> {
    const authenticationEntity = await this.authenticationRepository.login(email, password)
    return authenticationEntity
  }
}
