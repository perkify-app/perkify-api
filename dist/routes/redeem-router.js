"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redeemRouter = (0, express_1.Router)();
const redeem_controller_1 = require("../controllers/redeem-controller");
redeemRouter
    .route('/:user_id/:loyalty_card_id')
    .patch(redeem_controller_1.resetPoints)
    .delete(redeem_controller_1.removeLoyaltyCard);
exports.default = redeemRouter;
