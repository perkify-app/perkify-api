
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/connection';

export interface UserContext {
    id: string,
    merchant_id?: string,
    roles: string[]
}

export default function jwtHeaderAuth() {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!process.env.JWT_KEY) {
                throw new Error('JWT_KEY must be defined')
            }

            const [authType, accessToken] = req.headers.authorization?.split(" ") ?? [];
            if (authType !== "Bearer" || !accessToken) {
                throw new Error("Invalid authentication header");
            }

            const { sub, user_metadata } = jwt.verify(accessToken, process.env.JWT_KEY) as any;

            const merchant_id = (await db.query("SELECT merchant_id FROM users WHERE id = $1", [sub])).rows[0]?.merchant_id;

            const user: UserContext = {
                id: sub,
                roles: user_metadata?.roles ?? [],
                ...merchant_id && { merchant_id }
            };

            (req as any).user = user;
        }
        catch (error) {
            (req as any).user = null;
        }
        next();
    }
}