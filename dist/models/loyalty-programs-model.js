"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchantLoyaltyPrograms = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const merchantLoyaltyPrograms = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT * FROM loyalty_programs
        WHERE merchant_id = $1
        `, [params.merchant_id])
        .then((data) => {
        return data.rows;
    });
};
exports.merchantLoyaltyPrograms = merchantLoyaltyPrograms;
