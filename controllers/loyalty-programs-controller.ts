import { Request, Response, NextFunction } from 'express';
import * as loyaltyProgramModel from '../models/loyalty-programs-model';

export const getLoyaltyPrograms = (req: Request, res: Response, next: NextFunction) => {
    loyaltyProgramModel.getAllLoyaltyPrograms({})
        .then((loyalty_programs: any) => res.status(200).send({ loyalty_programs }))
        .catch((err: Error) => next(err));
};

export const getLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    loyaltyProgramModel.getLoyaltyProgramById(+req.params.loyalty_program_id)
        .then((loyalty_program: any) => res.status(200).send({ loyalty_program }))
        .catch((err: Error) => next(err));
};

export const postLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    loyaltyProgramModel.createLoyaltyProgram(req.body)
        .then((loyalty_program: any) => res.status(201).send({ loyalty_program }))
        .catch((err: Error) => next(err));
};

export const deleteLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    loyaltyProgramModel.removeLoyaltyProgram(+req.params.loyalty_program_id)
        .then(() => res.status(204).send())
        .catch((err: Error) => next(err));
};