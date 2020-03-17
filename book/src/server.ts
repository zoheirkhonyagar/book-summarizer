import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { schema } from './types';

// initial express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/book-summarizer');
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

// add middleware to express app
app.use(cors());

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
