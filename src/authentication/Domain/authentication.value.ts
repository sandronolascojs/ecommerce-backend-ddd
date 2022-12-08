import { AuthenticationEntity } from './authentication.entity'

export class AuthenticationValue implements AuthenticationEntity {
  public user: {
    id: string
    fistname: string
    role?: string
  }

  public token: string
  public refreshToken: string

  constructor ({ user, token, refreshToken }: AuthenticationEntity) {
    this.user = user
    this.token = token
    this.refreshToken = refreshToken
  }
}
