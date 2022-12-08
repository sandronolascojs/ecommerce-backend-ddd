
export interface AuthenticationEntity {
  user: {
    id: string
    fistname: string
    role?: string
  }
  token: string
  refreshToken: string
}
