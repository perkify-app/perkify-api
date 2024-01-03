import { Request, Response, NextFunction } from 'express';
import { specificUser, deleteSpecificUser } from '../models/users-model'

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    specificUser(req)
    .then((data: any) => {
        res.status(200).send({ user: data[0] })
    })
    .catch((err: any) => {
        next(err)
    })
};
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    deleteSpecificUser(req)
    .then((data: any) => {
        res.status(204).send(data)
    })
    .catch((err: any) => {
        next(err)
    })
};