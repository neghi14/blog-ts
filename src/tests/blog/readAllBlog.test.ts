import request from "supertest";

import app from "../..";

describe("GET /api/v1/blog/all", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1/blog/all")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
