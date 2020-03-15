import express from 'express';
import { json } from 'body-parser';

// initial express app
const app = express();

// add middleware to
app.use(json());

// reserve port to listen
app.listen(3000, (err: Error) => {
  if (err) {
    throw Error;
  }

  console.log('server is running on port 3000');
});
