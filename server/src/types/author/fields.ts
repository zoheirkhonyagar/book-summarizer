import { Field } from '../../interfaces/field';
import { authorType } from './author';
import Author from './../../models/author';

// define queries
// define authors field
const authors: Field = {
  type: authorType,
  resolve(parent, args) {
    return Author.find({});
  }
};

// define mutations

export default {
  query: {
    authors
  },
  mutation: {}
};
