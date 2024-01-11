"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsJson = void 0;
const { allEndpoints } = require('../models/endpoints-model');
const getEndpointsJson = (req, res, next) => {
    allEndpoints(req, res)
        .then((data) => {
        res.status(200).send({ endpoints: data });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getEndpointsJson = getEndpointsJson;
