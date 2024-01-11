import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/users-model';

export const patchAdminUser = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    userModel.updateUser(user_id, req.body)
        .then((user: any) => res.status(200).send({ user }))
        .catch((err: Error) => next(err));
};