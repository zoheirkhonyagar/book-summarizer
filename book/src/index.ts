import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

(async () => {
  // initial express app
  const app = express();
  app.get('/', (_req, res) => res.send('hello'));

  const apolloServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'hello world'
      }
    }
  });

  // register app to apollo middleware
  apolloServer.applyMiddleware({
    app
  });

  // reserve port to listen
  app.listen(4000, (err: Error) => {
    if (err) {
      throw Error;
    }

    console.log('server is running on port 4000');
  });
})();

// createConnection()
//   .then(async connection => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch(error => console.log(error));
