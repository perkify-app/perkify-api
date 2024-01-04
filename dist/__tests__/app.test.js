"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const endpoints_json_1 = __importDefault(require("../endpoints.json"));
describe("/api", () => {
    test("GET:200 sends an object describing all the endpoints availables to the client", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api")
            .expect(200)
            .then(({ body }) => expect(body.endpoints).toEqual(endpoints_json_1.default));
    });
});
