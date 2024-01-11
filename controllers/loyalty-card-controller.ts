import { Request, Response, NextFunction } from 'express';
import * as loyaltyCardModel from '../models/loyalty-card-model';

export const getLoyaltyCards = (req: Request, res: Response, next: NextFunction) => {
    const { sort_by, order }: loyaltyCardModel.ILoyaltyCardParams = req.query;

    loyaltyCardModel.getAllLoyaltyCards({ sort_by, order })
        .then((loyalty_cards: any) => res.status(200).send({ loyalty_cards }))
        .catch((err: Error) => next(err));
};

export const getLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    loyaltyCardModel.getLoyaltyCardById(+req.params.loyalty_card_id)
        .then((loyalty_card: any) => res.status(200).send({ loyalty_card }))
        .catch((err: Error) => next(err));
}

export const patchLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    loyaltyCardModel.giveLoyaltyStamps(+req.params.loyalty_card_id, +req.body.inc_points)
        .then((loyalty_card: any) => res.status(200).send({ loyalty_card }))
        .catch((err: Error) => next(err));
};

export const deleteLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    loyaltyCardModel.removeLoyaltyCard(+req.params.loyalty_card_id)
        .then(() => res.status(204).send())
        .catch((err: Error) => next(err));
};


export const redeemLoyaltyCard = (req: Request, res: Response, next: NextFunction) => {
    loyaltyCardModel.resetPoints(+req.params.loyalty_card_id)
        .then(() => res.status(200).send('Points Reset'))
        .catch((err: Error) => next(err));
};