import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    greeting: {
      type: GraphQLString,
      resolve(parent: any, args: any) {
        return 'Hello World!';
      }
    }
  }
});

export const schema = new GraphQLSchema({ query: rootType });
