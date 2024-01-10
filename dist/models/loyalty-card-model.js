"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLoyaltyCard = exports.giveLoyaltyStamps = exports.specificLoyaltyCard = exports.allLoyaltyCards = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const allLoyaltyCards = (req) => {
    let { params } = req;
    let { sort_by = 'points', order = 'desc', user_id, merchant_id, id } = req.query;
    if (params.user_id)
        user_id = params.user_id;
    if (sort_by.toLowerCase() !== 'points' && sort_by.toLowerCase() !== 'created_at')
        sort_by = 'id';
    if (order.toLowerCase() !== 'desc' && order.toLowerCase() !== 'asc')
        order = 'desc';
    let queryStr = `
    SELECT lc.*, lp.required_points, lp.name
    FROM loyalty_cards lc
    JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id`;
    if (id)
        queryStr += ` WHERE lc.id = '${id}'`;
    if (user_id && !id)
        queryStr += ` WHERE lc.user_id = '${user_id}'`;
    if (user_id && id)
        queryStr += ` AND lc.user_id = '${user_id}'`;
    if (merchant_id || params.id) {
        if (merchant_id && user_id || merchant_id && id) {
            queryStr += ` AND lp.merchant_id = '${merchant_id}'`;
        }
        if (merchant_id && !user_id) {
            queryStr += ` WHERE lp.merchant_id = '${merchant_id}'`;
        }
        if (params.id) {
            queryStr += ` WHERE lp.merchant_id = '${params.id}'`;
        }
    }
    queryStr += ` ORDER BY lc.${sort_by} ${order}`;
    return connection_1.default.query(queryStr)
        .then((data) => {
        return data.rows;
    });
};
exports.allLoyaltyCards = allLoyaltyCards;
const specificLoyaltyCard = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT lc.*, lp.required_points, lp.name
        FROM loyalty_cards lc
        JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id
        WHERE lc.id = $1
        `, [params.loyalty_card_id])
        .then((data) => {
        return data.rows[0];
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
const postLoyaltyCard = (req) => {
    const { loyalty_program_id, user_id } = req.params;
    return connection_1.default.query(`SELECT * FROM loyalty_cards WHERE loyalty_program_id = $1 AND user_id = $2`, [loyalty_program_id, user_id])
        .then((data) => {
        if (!data.rows.length) {
            return connection_1.default.query(`INSERT INTO loyalty_cards (loyalty_program_id, user_id, created_at)
            VALUES ($1, $2, CURRENT TIMESTAMP)
            RETURNING *`, [loyalty_program_id, user_id]);
        }
    })
        .then((data) => {
        if (data) {
            return data.rows[0];
        }
        else {
            throw { status: 400, msg: 'BAD REQUEST: Card Already Exists' };
        }
    });
};
exports.postLoyaltyCard = postLoyaltyCard;
