import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import { Field } from '../../interfaces/field';
import { authorType } from './author';
import Author from './../../models/author';

// define queries
// define authors field
const authors: Field = {
  type: GraphQLList(authorType),
  resolve(parent, args) {
    return Author.find({});
  }
};

// define mutations
// define add author
const addAuthor: Field = {
  type: authorType,
  args: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  },
  resolve(parent, args) {
    // execute params
    const { name, age } = args;

    // create an author instance
    const author = new Author({
      name,
      age
    });

    return author.save();
  }
};

export default {
  query: {
    authors
  },
  mutation: {
    addAuthor
  }
};
