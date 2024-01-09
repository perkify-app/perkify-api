"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allValues = exports.addMerchantInfo = exports.specificMerchant = exports.allMerchants = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const allMerchants = () => {
    return connection_1.default.query(`SELECT * FROM merchants;`)
        .then((data) => {
        return data.rows;
    });
};
exports.allMerchants = allMerchants;
const specificMerchant = (req) => {
    const { params } = req;
    return connection_1.default.query(`
        SELECT * FROM merchants
        WHERE id = $1
        `, [params.id])
        .then((data) => {
        return data.rows[0];
    });
};
exports.specificMerchant = specificMerchant;
const addMerchantInfo = (req) => {
    const { body, params } = req;
    const queryValues = [];
    let queryStr = 'UPDATE merchants';
    if (body) {
        queryStr += ` SET`;
        if (body.company_name) {
            queryValues.push(body.company_name);
            if (queryValues.length > 1) {
                queryStr += `, company_name = $${queryValues.length}`;
            }
            else {
                queryStr += ` company_name = $${queryValues.length}`;
            }
        }
        if (body.logo_url) {
            queryValues.push(body.logo_url);
            if (queryValues.length > 1) {
                queryStr += `, logo_url = $${queryValues.length}`;
            }
            else {
                queryStr += ` logo_url = $${queryValues.length}`;
            }
        }
        if (body.description) {
            queryValues.push(body.description);
            if (queryValues.length > 1) {
                queryStr += `, description = $${queryValues.length}`;
            }
            else {
                queryStr += ` description = $${queryValues.length}`;
            }
        }
        if (body.address) {
            queryValues.push(body.address);
            if (queryValues.length > 1) {
                queryStr += `, address = $${queryValues.length}`;
            }
            else {
                queryStr += ` address = $${queryValues.length}`;
            }
        }
        if (body.phone_no) {
            queryValues.push(body.phone_no);
            if (queryValues.length > 1) {
                queryStr += `, phone_no = $${queryValues.length}`;
            }
            else {
                queryStr += ` phone_no = $${queryValues.length}`;
            }
        }
    }
    queryValues.push(params.id);
    queryStr += ` WHERE id = $${queryValues.length}`;
    return connection_1.default.query(queryStr, queryValues)
        .then((data) => {
        return data.rows;
    });
};
exports.addMerchantInfo = addMerchantInfo;
const allValues = () => {
    return connection_1.default.query(`
        UPDATE merchants
        SET category = 'coffee'
        WHERE id IN ('B', 'C');`)
        .then((data) => {
        return data.rows[0];
    });
};
exports.allValues = allValues;
