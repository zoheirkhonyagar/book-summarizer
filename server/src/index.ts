import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { ObjectId } from 'mongodb';
import { sendRefreshToken } from './sendRefreshToken';

(async () => {
  // initial express app
  const app = express();

  // add cookie parser middleware
  app.use(cookieParser());

  // define simple route
  app.get('/', (_req, res) => res.send('hello world'));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;

    // check token is set or not
    if (!token) {
      return res.send({
        ok: false,
        accessToken: ''
      });
    }

    let payload: any = null;

    try {
      // verify token
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);

      return res.send({
        ok: false,
        accessToken: ''
      });
    }

    // everything is fine and send an access token
    const user = await User.findOne({
      where: {
        _id: new ObjectId(payload.userId)
      }
    });

    // check user exist or not
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    // set refresh token in cookies
    sendRefreshToken(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user)
    });
  });

  // create connection to database
  await createConnection();

  // create apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  // register express to apollo server middleware
  apolloServer.applyMiddleware({ app });

  // list to port 4000
  app.listen(4000, () => {
    console.log('server running on port 4000');
  });
})();
