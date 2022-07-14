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
  const completeLaunchData = {
    mission: " uss ent",
    rocket: "ncc",
    target: " kepler",
    launchDate: "january 4, 2028",
  };
  const launchdatawithoutdate = {
    mission: " uss ent",
    rocket: "ncc",
    target: " kepler",
  };

  const launchDataWithInvalidDate = {
    mission: " uss ent",
    rocket: "ncc",
    target: " kepler",
    launchDate: "root",
  };
  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchdatawithoutdate);
  });

  test("it should catch missing required properites", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchdatawithoutdate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "missing requires data",
    });
  });
  test("it should catch invalis dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "invalid launch date",
    });
  });
});
