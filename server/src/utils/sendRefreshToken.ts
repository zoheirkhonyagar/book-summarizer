import { Response } from 'express';

// this function is for set refresh token in cookie
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true
  });
};
