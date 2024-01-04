"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_json_1 = __importDefault(require("../endpoints.json"));
function getEndpointsInfo(_, res) {
    res.status(200).send(endpoints_json_1.default);
}
exports.default = getEndpointsInfo;
