import { AuthenticationEntity } from './authentication.entity'

export interface AuthenticationRepository {
  refreshToken: (refreshToken: string) => Promise<string | null>
  login: (email: string, password: string) => Promise<AuthenticationEntity | null>
  register: (email: string, password: string, firstname: string, lastname: string) => Promise<AuthenticationEntity | null>
}
