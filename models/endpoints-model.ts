import { Request, Response } from 'express';
import { readFileSync } from 'fs';

export const allEndpoints = (req: Request, res: Response) => {
  const data = readFileSync('./endpoints.json', 'utf8');
  const jsonData = JSON.parse(data);
  return Promise.resolve(jsonData)
};
