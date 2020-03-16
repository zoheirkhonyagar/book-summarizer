import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// import fields
import fields from './fields';

// define rootType
const rootType = new GraphQLObjectType({
  name: 'Root',
  fields
});

export const schema = new GraphQLSchema({ query: rootType });
