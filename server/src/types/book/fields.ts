import { Field } from '../../interfaces/field';
import { bookType } from './book';
import Book from './../../models/book';

// define books field
const books: Field = {
  type: bookType,
  resolve(parent, args) {
    return Book.find({});
  }
};

export default {
  books
};
