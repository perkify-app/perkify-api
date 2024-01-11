import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/users-model'
import * as loyaltyCardModel from '../models/loyalty-card-model';

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    userModel.getUserById(user_id)
        .then((user: any) => res.status(200).send({ user }))
        .catch((err: Error) => next(err))
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    userModel.removeUser(user_id)
        .then(() => res.status(204).send())
        .catch((err: Error) => next(err))
};

export const getUserLoyaltyCards = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    const { sort_by, order }: loyaltyCardModel.ILoyaltyCardParams = req.query;

    userModel.getUserById(user_id)
        .then(() => loyaltyCardModel.getAllLoyaltyCards({ sort_by, order, user_id }))
        .then((loyalty_cards: any) => res.status(200).send({ loyalty_cards }))
        .catch((err: Error) => next(err));
};

export const getUserLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, loyalty_card_id } = req.params;
    userModel.getUserById(user_id)
        .then(() => loyaltyCardModel.getLoyaltyCardById(+loyalty_card_id, user_id))
        .then((loyalty_card: any) => res.status(200).send({ loyalty_card }))
        .catch((err: Error) => next(err));
};

export const postUserLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    userModel.getUserById(user_id)
        .then(() => loyaltyCardModel.createLoyaltyCard({ ...req.body, user_id }))
        .then((loyalty_card: any) => res.status(201).send({ loyalty_card }))
        .catch((err: Error) => next(err));
};