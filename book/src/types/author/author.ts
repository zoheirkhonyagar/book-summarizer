import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';

// define author type for graphQL
const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

export { authorType };
