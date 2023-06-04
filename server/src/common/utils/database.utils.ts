import { Model, FilterQuery, Document } from "mongoose";

const readOne = (model: Model<Document>, params: Record<string, any>) => {
  try {
    return model.findOne(params);
  } catch (error: any) {
    return error.message;
  }
};

const readAll = (model: Model<Document>, query: FilterQuery<string>) => {
  try {
    return model.find(query);
  } catch (error: any) {
    return error.message;
  }
};

const createOne = (model: Model<Document>, payload: Document) => {
  try {
    return model.create(payload);
  } catch (error) {
    return error;
  }
};

const updateOne = (model: Model<Document>, params: Document<string>, payload: Document) => {
  try {
    return model.findByIdAndUpdate(params, payload, { new: true });
  } catch (error: any) {
    return error.message;
  }
};

const deleteOne = (model: Model<Document>, params: Document) => {
  try {
    return model.findByIdAndRemove(params);
  } catch (error: any) {
    error.message;
  }
};

export default { readOne, readAll, createOne, updateOne, deleteOne };
