import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

// import fields
import fields from './fields';

const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    greeting: {
      type: GraphQLString,
      args: {},
      resolve(parent, args) {
        return 'Hello World!';
      }
    },
    ...fields
  }
});

export const schema = new GraphQLSchema({ query: rootType });
