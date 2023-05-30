import { injectable } from "tsyringe";

@injectable()
export default class ErrorHelper {
  constructor() {}

  captureError(error: Error, meta?: Record<string, unknown>) {
    
  }

  userNameTaken(meta?: any) {
    const error = new Error("Username is taken");
    this.captureError(error);
    throw error;
  }
  userNotFound(meta?: any) {
    const error = new Error("Sorry, those credentials do not match");
    this.captureError(error);
    throw error;
  }
  emptyFields(meta?: any): void {
    const error = new Error("Sorry, your fields are empty");
    this.captureError(error);
    throw error;
  }
  passwordNotMatch(meta?: any) {
    const error = new Error("Invalid credentials");
    this.captureError(error);
    throw error;
  }
}
