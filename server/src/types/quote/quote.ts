import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

// define quote type for graphQL
const quoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    bookId: { type: GraphQLString }
  })
});

export { quoteType };
