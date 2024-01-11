"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const merchants_1 = __importDefault(require("./merchants"));
const loyaltyPrograms_1 = __importDefault(require("./loyaltyPrograms"));
const loyaltyCards_1 = __importDefault(require("./loyaltyCards"));
const merchantCategories_1 = __importDefault(require("../development-data/merchantCategories"));
exports.default = { users: users_1.default, merchants: merchants_1.default, loyaltyPrograms: loyaltyPrograms_1.default, loyaltyCards: loyaltyCards_1.default, merchantCategories: merchantCategories_1.default };
