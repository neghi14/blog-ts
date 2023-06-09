import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";
import { createHash } from "../../../common/utils/bcryptjs.utils";
import { User } from "../../../common/database/model";

@injectable()
export default class AddUserService
  implements Service<Request, Response>
{
  constructor(
    private userRepository: UserRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { username, password, name, email, phone } = req.body;

      const hashedPassword = await createHash(password);

      const newUserPayload: User = {
        username: username.toLowerCase(),
        password: hashedPassword,
        name,
        email,
        phone,
      };

      const data = await this.userRepository.createUser(
        newUserPayload
      );
      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "User successfully created",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        status: "error",
        statuscode: 503,
        message: error.message,
      });
     
    }
  }
}
