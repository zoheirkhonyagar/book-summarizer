import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { context } from '../interfaces/context';

// bearer 54646564464
export const isAuth: MiddlewareFn<context> = ({ context }, next) => {
  // get authorization header
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authenticated');
  }

  try {
    // authorization token
    const token = authorization.split(' ')[1];

    // verify token
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // set context
    context.payload = payload as any;
  } catch (error) {
    console.log(error);

    throw new Error('Not authenticated');
  }

  return next();
};
