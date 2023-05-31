import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../User/repositories/user.repository";
import Http from "../../../../common/utils/http.utils";
import { compareHash } from "../../../../common/utils/bcryptjs.utils";
import { createToken } from "../../../../common/utils/jwt.utils";
import ErrorUtility from "../../../../common/utils/error.utils";

@injectable()
export default class CustomerLoginService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user details
      const { username, password } = req.body;
      if (!username || !password) {
        return next(new ErrorUtility("Username or Password must not be empty", 404));
      }

      //Fetch data
      const user = await this.userRepository.readSingleUser({
        username,
      });
      if (!user) {
        return next(new ErrorUtility("User not found!", 400));
      }

      //confirm Password
      const confirmPassword = await compareHash(password, user.password);
      if (!confirmPassword) {
        return next(new ErrorUtility("Invalid Credentials", 400));
      }

      //create token
      const token = createToken(user);

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
    } catch (error) {
      return next(error);
    }
  }
}
