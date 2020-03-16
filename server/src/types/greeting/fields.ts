import { Field } from '../../interfaces/field';
import { GraphQLString } from 'graphql';

// define queries
// define greeting field
const greeting: Field = {
  type: GraphQLString,
  resolve() {
    return 'Hello World!';
  }
};

// define mutations
// define add greeting field
const addGreeting: Field = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent, args) {
    const { id } = args;
    return 'args includes : ' + id;
  }
};

export default {
  query: {
    greeting
  },
  mutation: {
    addGreeting
  }
};
