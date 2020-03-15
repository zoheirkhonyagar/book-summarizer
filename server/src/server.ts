import express from 'express';
import graphqlHTTP from 'express-graphql';
import { json } from 'body-parser';
import { buildSchema } from 'graphql';

// initial express app
const app = express();

// create simple schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// add middleware to
app.use(json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// reserve port to listen
app.listen(3000, (err: Error) => {
  if (err) {
    throw Error;
  }

  console.log('server is running on port 3000');
});
