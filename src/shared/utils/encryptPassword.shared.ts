import { hash, genSalt, compare } from 'bcrypt'

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)
  return hashPassword
}

export const comparePassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
  const isMatch = await compare(password, encryptedPassword)
  return isMatch
}
