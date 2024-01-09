"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificUser = exports.specificUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const specificUser = (req) => {
    const { params } = req;
    return connection_1.default.query(`
    SELECT * FROM users
    WHERE id = $1;
    UPDATE merchants
    SET category = 'bakery'
    WHERE id = A;
    UPDATE merchants
    SET category = 'coffee'
    WHERE id = B;
    UPDATE merchants
    SET category = 'coffee'
    WHERE id = C;
    `, [params.user_id])
        .then((data) => {
        return data.rows[0];
    });
};
exports.specificUser = specificUser;
const deleteSpecificUser = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        DELETE FROM users WHERE id = $1;`, [params.user_id]);
};
exports.deleteSpecificUser = deleteSpecificUser;
