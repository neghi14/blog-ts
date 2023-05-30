import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class DeleteUserService
  implements Service<Request, Response>
{
  constructor(
    private userRepository: UserRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userRepository.deleteUser({ _id: id });

      this.http.Response({
        res,
        status: "success",
        statuscode: 204,
        message: "User successfully removed from database",
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
