import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { Request, Response } from "express";
import UserRepository from "../../../User/repositories/user.repository";
import Http from "../../../../common/utils/http.utils";
import { compareHash } from "../../../../common/utils/bcryptjs.utils";
import { createToken } from "../../../../common/utils/jwt.utils";
import ErrorHelper from "../../../../common/helpers/error.helper";

@injectable()
export default class CustomerLoginService
  implements Service<Request, Response>
{
  constructor(
    private userRepository: UserRepository,
    private http: Http,
    private errorHandler: ErrorHelper
  ) {}
  async execute(req: Request, res: Response) {
    try {
      //Get user details
      const { username, password } = req.body;
      if (!username || !password) {
        this.errorHandler.emptyFields();
      }

      //Fetch data
      const user = await this.userRepository.getSingleUser({
        username,
      });
      if (!user) {
        this.errorHandler.userNotFound();
      }

      //confirm Password
      const confirmPassword = await compareHash(
        password,
        user[0].password
      );
      if (!confirmPassword) {
        this.errorHandler.passwordNotMatch();
      }

      //create token
      const token = createToken(user[0]);

      //store token
      const data = {
        token,
        user,
      };

      res.cookie("token", token);
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Log in Successful",
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
