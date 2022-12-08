import { client } from '../db/prisma.db'
import dayjs from 'dayjs'
import { AuthenticationRepository } from '../../Domain/authentication.repository'
import { AuthenticationEntity } from '../../Domain/authentication.entity'
import { createToken, verifyToken } from '../../../shared/utils/jwt.utils'
import { comparePassword } from '../../../shared/utils/encryptPassword.shared'

export class PrismaRepository implements AuthenticationRepository {
  public async refreshToken (refreshToken: string): Promise<string | null> {
    const token = await verifyToken(refreshToken)

    if (token === null) return null

    const refreshTokenDb = await client.refreshToken.findUnique({
      where: {
        token: refreshToken
      }
    })

    if (refreshTokenDb === null) return null

    const timeRefreshToken = dayjs().add(1, 'h').unix()

    const newToken = await createToken({ id: token.id }, timeRefreshToken)

    await client.refreshToken.update({
      where: {
        token: refreshToken
      },
      data: {
        token: newToken,
        expiredTime: timeRefreshToken
      }
    })

    return newToken
  }

  public async login (email: string, password: string): Promise<AuthenticationEntity | null> {
    const login = await client.customer.findUnique({
      where: {
        email
      }
    })

    if (login == null) return null

    const isPasswordValid = await comparePassword(password, login.password)

    if (!isPasswordValid) return null

    const timeToken = dayjs().add(15, 'minute').unix()
    const timeRefreshToken = dayjs().add(1, 'h').unix()

    const token = await createToken({ id: login.id, email: login.email }, timeToken)

    const refreshToken = await createToken({ id: login.id }, timeRefreshToken)

    await client.refreshToken.create({
      data: {
        token: refreshToken,
        customerId: login.id,
        expiredTime: timeRefreshToken
      }
    })

    return {
      token,
      refreshToken,
      user: {
        id: login.id,
        fistname: login.firstname
      }
    }
  }

  public async register (email: string, password: string, firstname: string, lastname: string): Promise<AuthenticationEntity | null> {
    const findUser = await client.customer.findUnique({
      where: {
        email
      }
    })

    if (findUser !== null) return null

    const register = await client.customer.create({
      data: {
        email,
        password,
        firstname,
        lastname
      }
    })

    const timeToken = dayjs().add(15, 'minute').unix()
    const timeRefreshToken = dayjs().add(1, 'h').unix()

    const token = await createToken({ id: register.id, email: register.email }, timeToken)

    const refreshToken = await createToken({ id: register.id }, timeRefreshToken)

    await client.refreshToken.create({
      data: {
        token: refreshToken,
        customerId: register.id,
        expiredTime: timeRefreshToken
      }
    })

    return {
      token,
      refreshToken,
      user: {
        id: register.id,
        fistname: register.firstname
      }
    }
  }
}
