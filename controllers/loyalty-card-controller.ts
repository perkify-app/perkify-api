import { Request, Response, NextFunction } from 'express';
import { giveLoyaltyStamps, specificLoyaltyCard, allLoyaltyCards } from '../models/loyalty-card-model';

export const getSpecificLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    specificLoyaltyCard(req)
    .then((data: any) => {
        res.status(200).send(data[0])
    })
    .catch((err: any) => {
        next(err)
    })
};
export const getAllLoyaltyCards = (req: Request, res: Response, next: NextFunction) => {
    allLoyaltyCards(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_cards: data })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const patchLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    giveLoyaltyStamps(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_card: data })
    })
    .catch((err: any) => {
        next(err)
    })
};