"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemLoyaltyCard = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const redeemLoyaltyCard = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        DELETE FROM loyalty_cards WHERE (user_id = $1 AND id = $2);`, [params.user_id, params.loyalty_card_id]);
};
exports.redeemLoyaltyCard = redeemLoyaltyCard;
