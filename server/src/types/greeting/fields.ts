import { Field } from '../../interfaces/field';
import { GraphQLString } from 'graphql';

// define greeting field
const greeting: Field = {
  type: GraphQLString,
  resolve() {
    return 'Hello World!';
  }
};

export default {
  greeting
};
