"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loyaltyProgramRouter = (0, express_1.Router)();
const loyalty_programs_controller_1 = require("../controllers/loyalty-programs-controller");
loyaltyProgramRouter
    .route('/')
    .get(loyalty_programs_controller_1.getAllPrograms);
loyaltyProgramRouter
    .route('/:id')
    .get(loyalty_programs_controller_1.getAllMerchantPrograms);
exports.default = loyaltyProgramRouter;
