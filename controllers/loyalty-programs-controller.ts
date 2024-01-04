import { Request, Response, NextFunction } from 'express';
import { merchantLoyaltyPrograms } from '../models/loyalty-programs-model';

export const getAllMerchantPrograms = (req: Request, res: Response, next: NextFunction) => {
    merchantLoyaltyPrograms(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_card: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};