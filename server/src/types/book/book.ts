import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString }
  }
});

export { bookType };
