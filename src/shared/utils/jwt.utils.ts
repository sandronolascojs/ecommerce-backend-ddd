import { config } from 'dotenv'
import { sign, verify } from 'jsonwebtoken'

config()

const JWT_SECRET: string = process.env.JWT_SECRET ?? 'secret'

export const createToken = async (payload: any, expiresIn: number): Promise<string> => {
  const token = sign(payload, JWT_SECRET, { expiresIn })
  return token
}

export const verifyToken = async (token: string): Promise<any> => {
  const payload = verify(token, JWT_SECRET)
  return payload
}
