import { AuthenticationRepository } from '../Domain/authentication.repository'

export class RefreshTokenUseCase {
  public authenticationRepository: AuthenticationRepository

  constructor (authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository
  }

  public async execute (refreshToken: string): Promise<string | null> {
    const authenticationEntity = await this.authenticationRepository.refreshToken(refreshToken)
    return authenticationEntity
  }
}
