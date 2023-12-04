import { injectable } from 'tsyringe'
import { connection } from '../../../app/database/database'
import type { CreateUser, FindUser, UpdatePassword } from '..'

@injectable()
export default class UserUsecase {
  async getOne({ id }: FindUser): Promise<any> {
    const sql = 'SELECT * FROM `users` WHERE id = ? LIMIT 1;'

    const [rows] = await connection.execute(sql, [id])

    return rows
  }

  async getAll(
    limit: string,
    offset: string,
    sort: string,
    order: string
  ): Promise<any> {
    const sql = `SELECT * FROM users ORDER BY ${sort} ${order} LIMIT ${Number(limit)} OFFSET ${
      Number(limit) * Number(offset) - Number(limit)
    };`

    const [rows] = await connection.execute(sql)

    return rows
  }

  async createUser({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    first_name,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    last_name,
    email,
    password
  }: CreateUser): Promise<any> {
    const sql =
      'INSERT INTO `users`(first_name, last_name, email, password, created_at) VALUES (?,?,?,?,?)'

    const [rows] = await connection.execute(sql, [
      first_name,
      last_name,
      email,
      password,
      new Date()
    ])

    return rows
  }

  async updatePassword({ id, password }: UpdatePassword): Promise<any> {
    const sql = 'UPDATE users SET password = ? WHERE id = ?;'

    const [rows] = await connection.execute(sql, [password, id])

    return rows
  }

  async deleteUser({ id }: FindUser): Promise<any> {
    const sql = 'DELETE FROM users WHERE id = ?;'

    const [rows] = await connection.execute(sql, [id])

    return rows
  }

  async count(): Promise<any> {
    const sql = 'SELECT COUNT(*) AS count FROM users;'
    const [rows] = await connection.execute(sql)
    return rows
  }
}
