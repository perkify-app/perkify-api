"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = void 0;
const redeem_model_1 = require("../models/redeem-model");
const deleteCard = (req, res, next) => {
    (0, redeem_model_1.redeemLoyaltyCard)(req)
        .then((data) => {
        res.status(204).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteCard = deleteCard;
