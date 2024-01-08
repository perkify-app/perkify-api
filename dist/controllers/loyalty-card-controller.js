"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchLoyaltyCard = exports.getAllLoyaltyCards = exports.getSpecificLoyaltyCard = void 0;
const loyalty_card_model_1 = require("../models/loyalty-card-model");
const getSpecificLoyaltyCard = (req, res, next) => {
    (0, loyalty_card_model_1.specificLoyaltyCard)(req)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getSpecificLoyaltyCard = getSpecificLoyaltyCard;
const getAllLoyaltyCards = (req, res, next) => {
    (0, loyalty_card_model_1.allLoyaltyCards)(req)
        .then((data) => {
        res.status(200).send({ loyalty_cards: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllLoyaltyCards = getAllLoyaltyCards;
const patchLoyaltyCard = (req, res, next) => {
    (0, loyalty_card_model_1.giveLoyaltyStamps)(req)
        .then((data) => {
        res.status(200).send({ loyalty_card: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchLoyaltyCard = patchLoyaltyCard;
