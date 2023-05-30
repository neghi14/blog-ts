import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { Request, Response } from "express";
import UserRepository from "../../../User/repositories/user.repository";
import Http from "../../../../common/utils/http.utils";
import { User } from "../../../../common/database/model";

@injectable()
export default class EditAccountService implements Service<Request, Response> {
  constructor(private userController: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

        const { name, username } = req.body;
        
        const newUserPayload: User = {
            name,
            username,
            updated_at: new Date()
        };

        const data = await this.userController.updateUser({ _id: id }, newUserPayload);
        this.http.Response({
            res,
            status: "success",
            statuscode: 201,
            message: "Successfully Updated User",
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
