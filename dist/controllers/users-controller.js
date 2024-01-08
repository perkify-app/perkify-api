"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = void 0;
const users_model_1 = require("../models/users-model");
const getUser = (req, res, next) => {
    (0, users_model_1.specificUser)(req)
        .then((data) => {
        res.status(200).send({ user: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getUser = getUser;
const deleteUser = (req, res, next) => {
    (0, users_model_1.deleteSpecificUser)(req)
        .then((data) => {
        res.status(204).send(data);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteUser = deleteUser;
