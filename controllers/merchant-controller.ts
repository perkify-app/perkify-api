import { Request, Response, NextFunction } from 'express';
import { allMerchants, addMerchantInfo, specificMerchant } from '../models/merchant-model';

export const getSpecificMerchant = (req: Request, res: Response, next: NextFunction) => {
    specificMerchant(req)
    .then((data: any) => {
        res.status(200).send({ merchant: data })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const getAllMerchants = (req: Request, res: Response, next: NextFunction) => {
    allMerchants()
    .then((data: any) => {
        res.status(200).send({ merchants: data })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const updateMerchant = (req: Request, res: Response, next: NextFunction) => {
    addMerchantInfo(req)
    .then((data: any) => {
        res.status(200).send({ merchant: data })
    })
    .catch((err: any) => {
        next(err)
    })
};