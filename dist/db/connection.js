"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const ENV = process.env.NODE_ENV || 'development';
const config = {};
require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
});
if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}
;
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE or DATABASE_URL not set');
}
;
exports.default = new pg_1.Pool(config);
