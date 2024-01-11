import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg';
import ApiError from './classes/ApiError';
import path from 'path'


export const apiErrorHandler = (err: ApiError, _: Request, res: Response, next: NextFunction) => {
    return err.status ? res.status(err.status).send({ message: err.message }) : next(err);
}

export const sqlErrorHandler = (err: DatabaseError, _: Request, res: Response, next: NextFunction) => {
    if (!err.code) return next(err);

    switch (err.code) {
        case "23505": //duplicate key value violates unique constraint
            return res.status(409).send({ message: `${err.detail?.match(/=\((.+)\)/)?.[1]} already exists` });
        case "23503": //insert/update violates foreign key constraint
            return res.status(422).send({ message: `${err.detail?.match(/=\((.+)\)/)?.[1]} cannot be processed` });
        case "42P01": //Table does not exist
        case "3D000": //DB does not exist
            return res.status(500).send({ message: "Database error" });
        default: return res.status(400).send({ message: "Bad request" });
    }
}

export const errorHandler = (err: DatabaseError, _: Request, res: Response, next: NextFunction) => {
    return res.status(500).send({ message: 'Internal error' });
};

export const fourOhFourHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).sendFile(path.join(__dirname, './assets', 'john-travolta-searching.gif'));
};