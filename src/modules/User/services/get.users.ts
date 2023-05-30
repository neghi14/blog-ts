import { injectable } from "tsyringe";
import UserRepository from "../repositories/user.repository";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class GetUsersService implements Service<Request, Response> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const data = await this.userRepository.readAllUser();

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Users successfully retrieved",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        status: "error",
        statuscode: 500,
        message: error.message,
      });
    }
  }
}
