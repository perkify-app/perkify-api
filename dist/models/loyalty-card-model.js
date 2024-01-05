"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveLoyaltyStamps = exports.specificLoyaltyCard = exports.allLoyaltyCards = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const allLoyaltyCards = (req) => {
    let { params } = req;
    let { sort_by = 'points', order = 'desc', user_id, merchant_id } = req.query;
    if (sort_by.toLowerCase() !== 'points' && sort_by.toLowerCase() !== 'created_at')
        sort_by = 'id';
    if (order.toLowerCase() !== 'desc' && order.toLowerCase() !== 'asc')
        order = 'desc';
    let queryStr = `SELECT * FROM loyalty_cards`;
    queryStr += ` JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id`;
    if (user_id)
        queryStr += ` WHERE loyalty_cards.user_id = '${user_id}'`;
    if (merchant_id || params.id) {
        if (merchant_id) {
            queryStr += ` WHERE loyalty_programs.merchant_id = '${merchant_id}'`;
        }
        if (params.id) {
            queryStr += ` WHERE loyalty_programs.merchant_id = '${params.id}'`;
        }
    }
    queryStr += ` ORDER BY ${sort_by} ${order}`;
    return connection_1.default.query(queryStr)
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
        WHERE loyalty_cards.id = $1
        `, [params.loyalty_card_id])
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
