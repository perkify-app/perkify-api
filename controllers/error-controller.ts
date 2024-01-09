import { Request, Response, NextFunction } from 'express';
import path from 'path'

export const handleFourOhFour = (req: Request, res: Response, next: NextFunction) => {    
        res.status(400).sendFile(path.join(__dirname, '../assets', 'john-travolta-searching.gif'));
};