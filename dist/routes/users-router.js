"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
const users_controller_1 = require("../controllers/users-controller");
const loyalty_card_controller_1 = require("../controllers/loyalty-card-controller");
usersRouter
    .route('/:user_id')
    .get(users_controller_1.getUser)
    .delete(users_controller_1.deleteUser);
usersRouter
    .route('/:user_id/loyalty_cards')
    .get(loyalty_card_controller_1.getAllLoyaltyCards);
usersRouter
    .route('/:user_id/loyalty_cards/:loyalty_program_id')
    .post(loyalty_card_controller_1.newLoyaltyCard);
exports.default = usersRouter;
