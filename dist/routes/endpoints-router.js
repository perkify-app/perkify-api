"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const endpointsRouter = (0, express_1.Router)();
const endpoints_controller_1 = require("../controllers/endpoints-controller");
endpointsRouter
    .route('/')
    .get(endpoints_controller_1.getEndpointsJson);
exports.default = endpointsRouter;
