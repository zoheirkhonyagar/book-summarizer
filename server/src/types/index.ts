import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// import fields
import fields from './fields';

// define rootType
const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: fields.query
});

// define mutation
const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: fields.mutation
});

export const schema = new GraphQLSchema({
  query: rootType,
  mutation: mutationType
});
