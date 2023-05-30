import config from "../config/config";
import mongoose, { Model } from "mongoose";
import "reflect-metadata";

const dbconnect = () => {
  mongoose
    .connect(config.database.url)
    .then(() => {
      console.log("Database has successfully connected");
    })
    .catch((err) => {
      console.log(`Database connection failed with error ${err}`);
    });
};

const createData = (model: Model<any>, data: Record<string, string | number>) => {
  try {
    return model.create(data);
  } catch (error) {
    return error;
  }
};

const readAllData = (model: Model<any>, filter?: any) => {
  try {
    return model.find(filter);
  } catch (error: any) {
    return error.message;
  }
};

const readSingleData = (model: Model<any>, options: Record<string, string | number>) => {
  try {
    return model.findOne(options);
  } catch (error: any) {
    return error.message;
  }
};

const updateData = (
  model: Model<any>,
  data: Record<string, string | number>,
  payload: Record<string, string | number>
) => {
  try {
    return model.findByIdAndUpdate(data, payload, { new: true });
  } catch (error: any) {
    return error.message;
  }
};

const deleteData = (model: Model<any>, data: Record<string, string | number>) => {
  try {
    return model.findByIdAndRemove(data);
  } catch (error: any) {
    error.message;
  }
};

export { dbconnect, createData, updateData, readAllData, readSingleData, deleteData };
