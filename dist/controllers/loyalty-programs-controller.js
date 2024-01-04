"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMerchantPrograms = void 0;
const loyalty_programs_model_1 = require("../models/loyalty-programs-model");
const getAllMerchantPrograms = (req, res, next) => {
    (0, loyalty_programs_model_1.merchantLoyaltyPrograms)(req)
        .then((data) => {
        res.status(200).send({ loyalty_programs: data[0] });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllMerchantPrograms = getAllMerchantPrograms;
