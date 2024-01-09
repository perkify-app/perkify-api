import { Request, Response, NextFunction } from 'express';
import { giveLoyaltyStamps, specificLoyaltyCard, allLoyaltyCards, postLoyaltyCard } from '../models/loyalty-card-model';

export const getSpecificLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    specificLoyaltyCard(req)
    .then((data: any) => {
        res.status(200).send(data)
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
export const newLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    postLoyaltyCard(req)
    .then((data: any) => {
        res.status(201).send(data)
    })
    .catch((err: any) => {
        return res.status(400).send(err.msg)
    })
};