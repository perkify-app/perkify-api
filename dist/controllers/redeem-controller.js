"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLoyaltyCard = exports.resetPoints = void 0;
const redeem_model_1 = require("../models/redeem-model");
const resetPoints = (req, res, next) => {
    (0, redeem_model_1.redeemLoyaltyCard)(req)
        .then((data) => {
        res.status(200).send('Points Reset');
    })
        .catch((err) => {
        next(err);
    });
};
exports.resetPoints = resetPoints;
const removeLoyaltyCard = (req, res, next) => {
    (0, redeem_model_1.deleteLoyaltyCard)(req)
        .then((data) => {
        res.status(204).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.removeLoyaltyCard = removeLoyaltyCard;
