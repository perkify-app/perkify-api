import { Request, Response, NextFunction } from 'express';
import { giveLoyaltyStamps, specificLoyaltyCard, allLoyaltyCards, createLoyaltyCard, removeLoyaltyCard, redeemLoyaltyCard } from '../models/loyalty-card-model';

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
export const postLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    createLoyaltyCard(req)
    .then((data: any) => {
        res.status(201).send(data)
    })
    .catch((err: any) => {
        return res.status(400).send(err.msg)
    })
};

export const deleteLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    removeLoyaltyCard(req)
    .then((data: any) => {
        res.status(204).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};


export const resetPoints = (req: Request, res: Response, next: NextFunction) => {
    redeemLoyaltyCard(req)
    .then((data: any) => {
        res.status(200).send('Points Reset')
    })
    .catch((err: any) => {
        next(err)
    })
};