import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';

(async () => {
  // initial express app
  const app = express();

  // define simple route
  app.get('/', (_req, res) => res.send('hello world'));

  // create connection to database
  await createConnection();

  // create apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  });

  // register express to apollo server middleware
  apolloServer.applyMiddleware({ app });

  // list to port 4000
  app.listen(4000, () => {
    console.log('server running on port 4000');
  });
})();
