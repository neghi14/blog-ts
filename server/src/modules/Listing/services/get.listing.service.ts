import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import ListingRepository from "../repository/listing.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class GetListingService implements Service<Request, Response, NextFunction> {
  constructor(private listingRepository: ListingRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const data = await this.listingRepository.readAll(req.query);

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Listings Retrieved!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
