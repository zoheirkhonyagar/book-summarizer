import { Resolver } from './../../interfaces/resolver';
import { bookType } from './book';

// create books resolver
const books: Resolver = {
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
