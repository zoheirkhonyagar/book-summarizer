import { Resolver } from './../../interfaces/resolver';
import { GraphQLString } from 'graphql';

// define greeting resolvers
const greeting: Resolver = {
  type: GraphQLString,
  args: {},
  resolve() {
    return 'Hello World!';
  }
};

export default {
  greeting
};
