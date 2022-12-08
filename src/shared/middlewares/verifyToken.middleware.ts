import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../utils/http.response'
import { verifyToken } from '../utils/jwt.utils'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export const adminTokenMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const { Authorization } = request.headers

    if (Authorization === undefined) {
      return new HttpResponse().UNAUTHORIZED(response, 'Token not provided')
    }

    const [, token] = Authorization
    const decoded = await verifyToken(token)

    const { sub } = decoded as TokenPayload
    request.body.admin = {
      sub
    }

    next()
  } catch (err) {
    return new HttpResponse().UNAUTHORIZED(response, 'Invalid token or expired')
  }
}
