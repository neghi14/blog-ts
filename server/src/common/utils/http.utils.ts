import { Response } from "express";

export default class Http {
  Response({ res, statuscode, status, message, data }: responseModel) {
    const response: Response = res.status(statuscode).json({
      status,
      message,
      data,
    });
    return response;
  }
}

export interface responseModel {
  res: Response;
  statuscode: number;
  status: "success" | "error" | "failed";
  message: string;
  data?: unknown;
  token?: string;
}
