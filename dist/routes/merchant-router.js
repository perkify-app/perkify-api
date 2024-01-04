"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const merchantRouter = (0, express_1.Router)();
const merchant_controller_1 = require("../controllers/merchant-controller");
merchantRouter
    .route('/')
    .get(merchant_controller_1.getAllMerchants);
merchantRouter
    .route('/:merchant_id')
    .get(merchant_controller_1.getSpecificMerchant)
    .patch(merchant_controller_1.updateMerchant);
exports.default = merchantRouter;
