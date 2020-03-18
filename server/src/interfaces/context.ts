import { Request, Response } from 'express';

export interface context {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
