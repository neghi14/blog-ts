import { injectable } from 'tsyringe'
import { http as Http } from '../../../app/libs/helpers'

@injectable()
export default class GetUserUsecase {
  constructor(readonly http: Http<any>) {}
  async getOne() {}
  async getAll() {}
}
