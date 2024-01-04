"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loyaltyProgramRouter = (0, express_1.Router)();
const loyalty_programs_controller_1 = require("../controllers/loyalty-programs-controller");
loyaltyProgramRouter
    .route('/:merchant_id')
    .get(loyalty_programs_controller_1.getAllMerchantPrograms);
//.post();
exports.default = loyaltyProgramRouter;
