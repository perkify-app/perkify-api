import { Request, Response, NextFunction } from 'express';
import { redeemLoyaltyCard } from '../models/redeem-model';
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
    redeemLoyaltyCard(req)
    .then((data: any) => {
        res.status(204).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};