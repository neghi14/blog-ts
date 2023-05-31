import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { verifyToken } from "../../../common/utils/jwt.utils";
import UserRepository from "../../User/repositories/user.repository";
import ErrorUtility from "../../../common/utils/error.utils";

@injectable()
export default class LoggedIn {
  constructor(private userRepository: UserRepository) {}

  async checkLogIn(req: Request, res: Response, next: NextFunction) {
    try {
      //check if cookies are available
      if (!req.headers.authorization?.includes("Bearer")) {
        return next(new ErrorUtility("Please Login", 401));
      }
      const authToken = req.headers.authorization?.split(" ")[1] || " ";

      const confirmToken = await verifyToken(authToken);
      if (confirmToken.exp < new Date()) {
        return next(new ErrorUtility("Your seesion has expired, please Login", 401));
      }
      const data = await this.userRepository.readSingleUser({ _id: confirmToken.data });

      req.body.user = data._id;
      next();
    } catch (error) {
      return next(error);
    }
  }
}
