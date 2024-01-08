"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMerchant = exports.getAllMerchants = exports.getSpecificMerchant = void 0;
const merchant_model_1 = require("../models/merchant-model");
const getSpecificMerchant = (req, res, next) => {
    (0, merchant_model_1.specificMerchant)(req)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getSpecificMerchant = getSpecificMerchant;
const getAllMerchants = (req, res, next) => {
    (0, merchant_model_1.allMerchants)()
        .then((data) => {
        res.status(200).send({ merchants: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllMerchants = getAllMerchants;
const updateMerchant = (req, res, next) => {
    (0, merchant_model_1.addMerchantInfo)(req)
        .then((data) => {
        res.status(200).send({ merchant: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.updateMerchant = updateMerchant;
