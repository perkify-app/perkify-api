import { Request, Response, NextFunction } from 'express';
import { deleteLoyaltyCard, redeemLoyaltyCard } from '../models/redeem-model';
export const resetPoints = (req: Request, res: Response, next: NextFunction) => {
    redeemLoyaltyCard(req)
    .then((data: any) => {
        res.status(200).send('Points Reset')
    })
    .catch((err: any) => {
        next(err)
    })
};
export const removeLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    deleteLoyaltyCard(req)
    .then((data: any) => {
        res.status(204).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};