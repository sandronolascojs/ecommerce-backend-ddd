import { Request, Response } from 'express'
import { HttpResponse } from '../../../shared/utils/http.response'
import { CustomerLoginUseCase } from '../../Application/customerLoginUseCase'
import { CustomerRegistrationUseCase } from '../../Application/CustomerRegistrationUseCase'
import { RefreshTokenUseCase } from '../../Application/refreshTokenUseCase'
import { AuthenticationEntity } from '../../Domain/authentication.entity'

export class AuthenticationController {
  constructor (
    private readonly customerLoginUseCase: CustomerLoginUseCase,
    private readonly customerRegistrationUseCase: CustomerRegistrationUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  public customerLogin = async (request: Request, response: Response): Promise<Response<AuthenticationEntity | null>> => {
    const { email, password } = request.body
    const data = await this.customerLoginUseCase.execute(email, password)

    if (data === null) return new HttpResponse().UNAUTHORIZED(response, 'invalid credentials')

    return new HttpResponse().OK(response, data)
  }

  public customerRegistration = async (request: Request, response: Response): Promise<Response<AuthenticationEntity | null>> => {
    const { email, password, firstname, lastname } = request.body
    const data = await this.customerRegistrationUseCase.execute(email, password, firstname, lastname)

    if (data === null) return new HttpResponse().CONFLICT(response, 'conflict')

    return new HttpResponse().OK(response, data)
  }

  public refreshToken = async (request: Request, response: Response): Promise<Response<string | null>> => {
    const { refreshToken } = request.body
    const data = await this.refreshTokenUseCase.execute(refreshToken)

    if (data === null) return new HttpResponse().UNAUTHORIZED(response, 'refresh token expired or invalid')

    return new HttpResponse().OK(response, data)
  }
}
