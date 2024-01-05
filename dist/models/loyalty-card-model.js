"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveLoyaltyStamps = exports.specificLoyaltyCard = exports.allLoyaltyCards = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const allLoyaltyCards = () => {
    return connection_1.default.query(`SELECT * FROM loyalty_cards;`)
        .then((data) => {
        return data.rows;
    });
};
exports.allLoyaltyCards = allLoyaltyCards;
const specificLoyaltyCard = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT *
        FROM loyalty_cards
        JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id
        WHERE user_id = $1
        `, [params.user_id])
        .then((data) => {
        return data.rows;
    });
};
exports.specificLoyaltyCard = specificLoyaltyCard;
const giveLoyaltyStamps = (req) => {
    const { body, params } = req;
    return connection_1.default.query(`
    UPDATE loyalty_cards
    SET points = points + $1
    WHERE id = $2
    `, [body.inc_points, params.loyalty_card_id])
        .then((data) => {
        return data.rows;
    });
};
exports.giveLoyaltyStamps = giveLoyaltyStamps;
