"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
const users_controller_1 = require("../controllers/users-controller");
usersRouter
    .route('/alter-this-table')
    .get(users_controller_1.getUser)
    .delete(users_controller_1.deleteUser);
exports.default = usersRouter;
