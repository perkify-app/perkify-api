import { Request, Response, NextFunction } from 'express';
import { giveLoyaltyStamps, specificLoyaltyCard, allLoyaltyCards } from '../models/loyalty-model';

export const getSpecificLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    specificLoyaltyCard(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_card: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const getAllLoyaltyCards = (req: Request, res: Response, next: NextFunction) => {
    allLoyaltyCards()
    .then((data: any) => {
        res.status(200).send({ loyalty_cards: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const patchLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    giveLoyaltyStamps(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_card: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};