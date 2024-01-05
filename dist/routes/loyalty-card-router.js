"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loyaltyCardRouter = (0, express_1.Router)();
const loyalty_card_controller_1 = require("../controllers/loyalty-card-controller");
loyaltyCardRouter
    .route('/')
    .get(loyalty_card_controller_1.getAllLoyaltyCards);
loyaltyCardRouter
    .route('/:user_id')
    .get(loyalty_card_controller_1.getSpecificLoyaltyCard)
    .patch(loyalty_card_controller_1.patchLoyaltyCard);
exports.default = loyaltyCardRouter;
