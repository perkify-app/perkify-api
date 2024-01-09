"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const merchantRouter = (0, express_1.Router)();
const merchant_controller_1 = require("../controllers/merchant-controller");
const loyalty_card_controller_1 = require("../controllers/loyalty-card-controller");
const loyalty_programs_controller_1 = require("../controllers/loyalty-programs-controller");
const loyalty_programs_controller_2 = require("../controllers/loyalty-programs-controller");
merchantRouter
    .route('/')
    .get(merchant_controller_1.getAllMerchants);
merchantRouter
    .route('/change-values')
    .get(merchant_controller_1.changeValues);
merchantRouter
    .route('/:id')
    .get(merchant_controller_1.getSpecificMerchant)
    .patch(merchant_controller_1.updateMerchant);
merchantRouter
    .route('/:id/cards')
    .get(loyalty_card_controller_1.getAllLoyaltyCards);
merchantRouter
    .route('/:id/programs')
    .get(loyalty_programs_controller_1.getAllMerchantPrograms)
    .post(loyalty_programs_controller_1.postLoyaltyProgram);
merchantRouter
    .route('/:id/programs/:program_id')
    .get(loyalty_programs_controller_1.getSpecificMerchantProgram)
    .delete(loyalty_programs_controller_2.deleteLoyaltyProgram);
exports.default = merchantRouter;
