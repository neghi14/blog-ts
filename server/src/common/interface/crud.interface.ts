import { Document, FilterQuery, Model } from "mongoose";

export default interface CRUD {
  readOne(model: Model<Document>, params: FilterQuery<string>): Promise<unknown>;
  readAll(model: Model<Document>, query: FilterQuery<object>): Promise<unknown>;
  createOne(model: Model<Document>, payload: Document): Promise<unknown>;
  updateOne(model: Model<Document>, params: FilterQuery<string>, payload: Document): Promise<unknown>;
  deleteOne(model: Model<Document>, params: FilterQuery<string>): Promise<unknown>;
}
