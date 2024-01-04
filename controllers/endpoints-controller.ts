import { Request, Response, NextFunction } from 'express';
const { allEndpoints } = require('../models/endpoints-model')

export const getEndpointsJson = (req: Request, res: Response, next: NextFunction) => {
    allEndpoints(req, res)
    .then((data: any) => {
        res.status(200).send({endpoints: data})
    })
    .catch((err: any) => {
        next(err)
    })
}
