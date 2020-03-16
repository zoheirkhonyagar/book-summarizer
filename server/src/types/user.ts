import { GraphQLObjectType, GraphQLString } from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});
