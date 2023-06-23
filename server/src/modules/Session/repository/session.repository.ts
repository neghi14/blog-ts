import { injectable } from "tsyringe";
import CRUD from "../../../common/interface/crud.interface";
import { readOne, readAll, createOne, updateOne, deleteOne, countAll } from "../../../common/utils/database.utils";
import sessionSchema from "../../../common/database/schema/session.schema";
import Session from "../../../common/database/model/session.model";

@injectable()
export default class SessionRepository implements CRUD {
  async readOne(params: object): Promise<unknown> {
    try {
      return await readOne(sessionSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: object): Promise<unknown> {
    try {
      return await readAll(sessionSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: Session): Promise<any> {
    try {
      return await createOne(sessionSchema, payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(params: string, payload: Session): Promise<unknown> {
    try {
      return await updateOne(sessionSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<unknown> {
    try {
      return await deleteOne(sessionSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<unknown> {
    try {
      return await countAll(sessionSchema);
    } catch (error) {
      return error;
    }
  }
}
