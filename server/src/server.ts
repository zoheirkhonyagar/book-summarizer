import express from 'express';
import graphqlHTTP from 'express-graphql';
import { json } from 'body-parser';
import { schema } from './types/index';

// initial express app
const app = express();

// add middleware to express app
app.use(json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// reserve port to listen
app.listen(4000, (err: Error) => {
  if (err) {
    throw Error;
  }

  console.log('server is running on port 4000');
});
