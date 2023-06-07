import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import LikesRepository from "../repository/likes.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class GetLikesService implements Service<Request, Response, NextFunction> {
  constructor(private likeRepository: LikesRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const likes = await this.likeRepository.readAll(req.query);
      const likes_length = await this.likeRepository.countAll();

      const data = {
        page: Number(req.query.skip) * 1 || 1,
        limit: Number(req.query.limit) || 10,
        likes,
      };

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Likes Retrieved!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
