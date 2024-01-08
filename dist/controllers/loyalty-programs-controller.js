"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoyaltyProgram = exports.postLoyaltyProgram = exports.getSpecificMerchantProgram = exports.getAllMerchantPrograms = void 0;
const loyalty_programs_model_1 = require("../models/loyalty-programs-model");
const getAllMerchantPrograms = (req, res, next) => {
    (0, loyalty_programs_model_1.merchantLoyaltyPrograms)(req)
        .then((data) => {
        res.status(200).send({ loyalty_programs: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllMerchantPrograms = getAllMerchantPrograms;
const getSpecificMerchantProgram = (req, res, next) => {
    (0, loyalty_programs_model_1.specificMerchantLoyaltyProgram)(req)
        .then((data) => {
        res.status(200).send({ loyalty_program: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getSpecificMerchantProgram = getSpecificMerchantProgram;
const postLoyaltyProgram = (req, res, next) => {
    (0, loyalty_programs_model_1.createLoyaltyPrograms)(req)
        .then((data) => {
        res.status(201).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.postLoyaltyProgram = postLoyaltyProgram;
const deleteLoyaltyProgram = (req, res, next) => {
    (0, loyalty_programs_model_1.deleteMerchantLoyaltyProgram)(req)
        .then((data) => {
        res.status(204).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteLoyaltyProgram = deleteLoyaltyProgram;
