import request from "supertest";
import app from "../app";
import endpointsInfo from "../endpoints.json"


describe("/api", () => {
    test("GET:200 sends an object describing all the endpoints availables to the client", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => expect(body).toEqual(endpointsInfo));
    });
    test("GET:200 ensure the endpoints information is up to date with the application", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                Object.keys(body).forEach((endpoint: string) => {
                    expect(body[endpoint]).toMatchObject({
                        description: expect.any(String),
                        queries: expect.any(Array),
                        format: expect.any(String),
                        exampleResponse: expect.any(Object)
                    })
                });
            });
    });
});