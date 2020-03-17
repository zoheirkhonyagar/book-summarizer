import { GraphQLList, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import { Field } from './../../interfaces/field';
import { authorType } from './author';
import Author from './../../models/author';

// define queries

// define authors query to get list of all authors
const authors: Field = {
  type: GraphQLList(authorType),
  resolve(parent, args) {
    return Author.find({});
  }
};

// define author query to ge an author
const author: Field = {
  type: authorType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return Author.findById(args.id);
  }
};

// define mutations

// define add author mutation to create an author
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
    authors,
    author
  },
  mutation: {
    addAuthor
  }
};
