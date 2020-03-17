import { GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import { Field } from './../../interfaces/field';
import { bookType } from './book';
import Book from './../../models/book';

// define queries

// define books query to get list of all books
const books: Field = {
  type: GraphQLList(bookType),
  resolve(parent, args) {
    return Book.find({});
  }
};

// define book query to get a book
const book: Field = {
  type: bookType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return Book.findById(args.id);
  }
};

// define mutations

// define add book mutation to create a book
const addBook: Field = {
  type: bookType,
  args: {
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString }
  },
  resolve(parent, args) {
    // execute params
    const { name, genre, authorId } = args;

    // create a book instance
    const book = new Book({
      name,
      genre,
      authorId
    });

    return book.save();
  }
};

export default {
  query: {
    books,
    book
  },
  mutation: {
    addBook
  }
};
