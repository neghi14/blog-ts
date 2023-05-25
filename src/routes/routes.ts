import express from "express";

export abstract class routesConfig {
  private name: string;
  app: express.Application;
  constructor(app: express.Application, name: string) {
    this.name = name;
    this.app = app;
    this.configureRoutes();
  }
  get Name() {
    return this.name;
  }
  abstract configureRoutes(): express.Application;
}
