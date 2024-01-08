"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMerchantLoyaltyProgram = exports.createLoyaltyPrograms = exports.specificMerchantLoyaltyProgram = exports.merchantLoyaltyPrograms = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const merchantLoyaltyPrograms = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT * FROM loyalty_programs
        WHERE merchant_id = $1
        `, [params.id])
        .then((data) => {
        return data.rows;
    });
};
exports.merchantLoyaltyPrograms = merchantLoyaltyPrograms;
const specificMerchantLoyaltyProgram = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT * FROM loyalty_programs
        WHERE merchant_id = $1 AND id = $2
        `, [params.id, params.program_id])
        .then((data) => {
        return data.rows[0];
    });
};
exports.specificMerchantLoyaltyProgram = specificMerchantLoyaltyProgram;
const createLoyaltyPrograms = (req) => {
    const { body, params } = req;
    return connection_1.default.query(`
        INSERT INTO loyalty_programs(merchant_id, name, required_points)
        VALUES ($1, $2, $3)
        RETURNING *`, [params.id, body.name, body.required_points])
        .then((data) => {
        return data.rows;
    });
};
exports.createLoyaltyPrograms = createLoyaltyPrograms;
const deleteMerchantLoyaltyProgram = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        DELETE FROM loyalty_programs WHERE (merchant_id = $1 AND id = $2);`, [params.id, params.program_id]);
};
exports.deleteMerchantLoyaltyProgram = deleteMerchantLoyaltyProgram;
