import { Request, Response, NextFunction } from 'express';
const { specificLoyaltyCard, allLoyaltyCards } = require('../models/loyalty-model.ts')

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
    allLoyaltyCards(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_cards: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};