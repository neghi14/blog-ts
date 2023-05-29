import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";
import { createHash } from "../../../common/utils/bcryptjs.utils";
import { User } from "../../../common/database/model";

@injectable()
export default class EditUserService
  implements Service<Request, Response>
{
  constructor(
    private userRepository: UserRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { password } = req.body;

      const hashedPassword = await createHash(password);

      const newUserPayload: User = {
        password: hashedPassword,
        updated_at: new Date(),
      };

      const data = await this.userRepository.editUser(
        { _id: id },
        newUserPayload
      );

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "User data has been updated",
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
