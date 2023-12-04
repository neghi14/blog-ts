import { compare, hash } from 'bcryptjs'

export const encrypt = async (password: string): Promise<string> => {
  return hash(password, 10)
}

export const check = async (
  mainPassword: string,
  comparePassword: string
): Promise<boolean> => {
  return compare(mainPassword, comparePassword)
}
