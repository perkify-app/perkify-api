import { Request, Response } from 'express';
import endpointsInfo from "../endpoints.json"

export default function getEndpointsInfo(_: Request, res: Response) {
    res.status(200).send(endpointsInfo);
} 