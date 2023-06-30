import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import LikesRepository from "../repository/likes.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class GetLikesService implements Service<Request, Response, NextFunction> {
  constructor(private likesRepository: LikesRepository, private http: Http) {}

  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;

      const data = await this.likesRepository.readAll({ ...req.query, liked_post: id });

      this.http.Response({
        res,
        statuscode: 200,
        status: "success",
        message: "Likes Retrived!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
