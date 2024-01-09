import { Request, Response, NextFunction } from 'express';

export const handleFourOhFour = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ msg: err.msg })
};