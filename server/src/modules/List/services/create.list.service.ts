import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import ListRepository from "../repository/list.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import List from "../../../common/database/model/list.model";

@injectable()
export default class CreateListService implements Service<Request, Response, NextFunction> {
  constructor(private listRepository: ListRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { title, thumbnail } = req.body;
      const { _id } = res.locals.user;

      const newListPayload: List = {
        title,
        thumbnail,
        author: _id,
      };
      const data = await this.listRepository.createOne(newListPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "List Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
