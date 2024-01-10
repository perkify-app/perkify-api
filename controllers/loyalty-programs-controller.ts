import { Request, Response, NextFunction } from 'express';
import { allLoyaltyPrograms, createLoyaltyPrograms, deleteMerchantLoyaltyProgram, merchantLoyaltyPrograms, specificMerchantLoyaltyProgram } from '../models/loyalty-programs-model';

export const getAllPrograms = (req: Request, res: Response, next: NextFunction) => {
    allLoyaltyPrograms()
    .then((data: any) => {
        res.status(200).send({ loyalty_programs: data })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const getAllMerchantPrograms = (req: Request, res: Response, next: NextFunction) => {
    merchantLoyaltyPrograms(req)
    .then((data: any) => {
        res.status(200).send({ loyalty_programs: data })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const getSpecificMerchantProgram = (req: Request, res: Response, next: NextFunction) => {
    specificMerchantLoyaltyProgram(req)
    .then((data: any) => {
        res.status(200).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};
export const postLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    createLoyaltyPrograms(req)
    .then((data: any) => {
        res.status(201).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};
export const deleteLoyaltyProgram = (req: Request, res: Response, next: NextFunction) => {
    deleteMerchantLoyaltyProgram(req)
    .then((data: any) => {
        res.status(204).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};