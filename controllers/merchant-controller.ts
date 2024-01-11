import { Request, Response, NextFunction } from 'express';
import * as merchantModel from '../models/merchant-model';
import * as loyaltyProgramModel from '../models/loyalty-programs-model';


export const getMerchants = (_: Request, res: Response, next: NextFunction) => {
    merchantModel.getAllMerchants()
        .then((merchants: any) => res.status(200).send({ merchants }))
        .catch((err: Error) => next(err))
};

export const getMerchant = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id } = req.params;
    merchantModel.getMerchantById(merchant_id)
        .then((merchant: any) => res.status(200).send({ merchant }))
        .catch((err: Error) => next(err))
};

export const patchMerchant = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id } = req.params;
    merchantModel.updateMerchant(merchant_id, req.body)
        .then((merchant: any) => res.status(200).send({ merchant }))
        .catch((err: Error) => next(err))
};

export const getMerchantLoyaltyPrograms = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id } = req.params;
    merchantModel.getMerchantById(merchant_id)
        .then(() => loyaltyProgramModel.getAllLoyaltyPrograms({ merchant_id }))
        .then((loyalty_programs: any) => res.status(200).send({ loyalty_programs }))
        .catch((err: Error) => next(err));
};

export const postMerchantLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id } = req.params;
    merchantModel.getMerchantById(merchant_id)
        .then(() => loyaltyProgramModel.createLoyaltyProgram({ ...req.body, merchant_id }))
        .then((loyalty_program: any) => res.status(201).send({ loyalty_program }))
        .catch((err: Error) => next(err));
};

export const getMerchantLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id, loyalty_program_id } = req.params;
    merchantModel.getMerchantById(merchant_id)
        .then(() => loyaltyProgramModel.getLoyaltyProgramById(+loyalty_program_id, merchant_id))
        .then((loyalty_program: any) => res.status(200).send({ loyalty_program }))
        .catch((err: Error) => next(err));
};

export const deleteMerchantLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    const { merchant_id, loyalty_program_id } = req.params;
    merchantModel.getMerchantById(merchant_id)
        .then(() => loyaltyProgramModel.removeLoyaltyProgram(+loyalty_program_id, merchant_id))
        .then(() => res.status(204).send())
        .catch((err: Error) => next(err));
};