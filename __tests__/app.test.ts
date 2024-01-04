import request from "supertest";
import app from "../app";
import endpointsInfo from "../endpoints.json"


describe("/api", () => {
    test("GET:200 sends an object describing all the endpoints availables to the client", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => expect(body.endpoints).toEqual(endpointsInfo));
    });
});