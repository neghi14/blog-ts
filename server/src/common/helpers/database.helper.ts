import { injectable } from "tsyringe";
import { Model } from "mongoose";

@injectable()
export default class DatabaseQueryHelper {
  async readOne(model: Model<any>, params: object) {
    try {
      return await model.findOne(params);
    } catch (error: any) {
      error.message;
    }
  }

  async readAll(model: Model<any>, query: Record<string, any>) {
    try {
      const filterObj = { ...query };
      const queryObj = { ...query };
      const queryDelete = ["sort", "limit", "skip"];
      queryDelete.map((el) => delete filterObj[el]);

      //FILTER
      let queryStr = JSON.stringify(filterObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

      //SORT
      let sort;
      if (queryObj.sort) {
        sort = queryObj.sort.split(",").join(" ");
      } else {
        sort = "created_at";
      }

      //PAGINATION
      const skip = queryObj.skip * 1 || 1;
      const limit = query.limit * 1 || 10;
      const page = (skip - 1) * limit;

      return await model.find(JSON.parse(queryStr)).sort(sort).skip(page).limit(limit);
    } catch (error: any) {
      error.message;
    }
  }

  async createOne(model: Model<any>, payload: object) {
    try {
      return await model.create(payload);
    } catch (error: any) {
      error.message;
    }
  }

  async updateOne(model: Model<any>, params: string, payload: object) {
    try {
      return await model.findByIdAndUpdate(params, payload, { new: true });
    } catch (error: any) {
      error.message;
    }
  }

  async deleteOne(model: Model<any>, params: string) {
    try {
      return await model.findByIdAndRemove(params);
    } catch (error: any) {
      error.message;
    }
  }
  async countAll(model: Model<any>) {
    try {
      return await model.countDocuments();
    } catch (error: any) {
      error.message;
    }
  }
}
