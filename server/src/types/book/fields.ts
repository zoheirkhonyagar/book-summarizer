import { Field } from '../../interfaces/field';
import { bookType } from './book';

// define books field
const books: Field = {
  type: bookType,
  resolve(parent, args) {
    return {
      id: 'we are books'
    };
  }
};

export default {
  books
};
