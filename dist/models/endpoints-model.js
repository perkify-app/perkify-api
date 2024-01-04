"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allEndpoints = void 0;
const fs_1 = require("fs");
const allEndpoints = (req, res) => {
    const data = (0, fs_1.readFileSync)('./endpoints.json', 'utf8');
    const jsonData = JSON.parse(data);
    return Promise.resolve(jsonData);
};
exports.allEndpoints = allEndpoints;
