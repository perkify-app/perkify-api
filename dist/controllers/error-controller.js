"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFourOhFour = void 0;
const path_1 = __importDefault(require("path"));
const handleFourOhFour = (req, res, next) => {
    res.status(404).sendFile(path_1.default.join(__dirname, '../assets', 'john-travolta-searching.gif'));
};
exports.handleFourOhFour = handleFourOhFour;
