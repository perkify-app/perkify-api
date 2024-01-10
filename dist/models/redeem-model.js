"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoyaltyCard = exports.redeemLoyaltyCard = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const redeemLoyaltyCard = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT * FROM loyalty_cards
        JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id
        WHERE user_id = $1
        AND loyalty_cards.id = $2
        AND loyalty_cards.points = loyalty_programs.required_points;`, [params.user_id, params.loyalty_card_id])
        .then((data) => {
        if (data.rows.length) {
            return connection_1.default.query(`
                UPDATE loyalty_cards
                SET points = 0
                WHERE id = $2
                AND user_id = $1`, [params.user_id, params.loyalty_card_id]);
        }
        else {
            throw new Error;
        }
    });
};
exports.redeemLoyaltyCard = redeemLoyaltyCard;
const deleteLoyaltyCard = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        DELETE FROM loyalty_cards WHERE (user_id = $1 AND id = $2);`, [params.user_id, params.loyalty_card_id]);
};
exports.deleteLoyaltyCard = deleteLoyaltyCard;
