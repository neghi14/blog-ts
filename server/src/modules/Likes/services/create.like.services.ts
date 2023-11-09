import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import LikesRepository from "../repository/likes.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Like } from "../../../common/database/model";

@injectable()
export default class CreateLikeService implements Service<Request, Response, NextFunction> {
  constructor(private likesRepository: LikesRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;
      const { _id } = res.locals.user;
      const newLikesPayload: Like = {
        liked_post: id,
        liked_by: _id,
      };
      const data = await this.likesRepository.createOne(newLikesPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Likes Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
