import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { verifyToken } from "../../../common/utils/jwt.utils";
import UserRepository from "../../User/repositories/user.repository";
import { User } from "../../../common/database/model";

@injectable()
export default class LoggedIn {
  constructor(private userRepository: UserRepository) {}

  async checkLogIn(req: Request, res: Response, next: NextFunction) {
    try {
      //check if cookies are available
      //   if (req.headers.authorization?.includes("Bearer")) {
      //     console.log("hi");
      //   }
      const authToken = req.headers.authorization?.split(" ")[1] || " ";

      const confirmToken = await verifyToken(authToken);

      const data = await this.userRepository.readSingleUser({ _id: confirmToken.data });

      req.body.user = data._id;
      next();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
