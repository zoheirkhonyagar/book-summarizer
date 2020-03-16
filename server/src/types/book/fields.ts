import { Field } from '../../interfaces/field';
import { bookType } from './book';
import Book from './../../models/book';

// define queries
// define books field
const books: Field = {
  type: bookType,
  resolve(parent, args) {
    return Book.find({});
  }
};

// define mutations

export default {
  query: {
    books
  },
  mutation: {}
};
