export interface CreateUser {
  first_name: string
  last_name: string
  email: string
  password: string
}
export interface User extends CreateUser {
  id: number
  created_at: Date
  updated_at: Date
}
export interface FindUser {
  id: string
}
export interface UpdatePassword {
  id: number
  password: string
}
