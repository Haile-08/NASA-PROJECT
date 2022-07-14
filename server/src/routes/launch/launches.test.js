const request = require("supertest");
const app = require("../../app");
//get testing
describe("Test GET /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.statusCode).toBe(200);
  });
});
///post test
describe("Test POST /launches", () => {
  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: " uss ent",
        rocket: "ncc",
        target: " kepler",
        launchDate: "january 4, 2028",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("it should catch missing required properites", () => {});
  test("it should catch invalis dates", () => {});
});
