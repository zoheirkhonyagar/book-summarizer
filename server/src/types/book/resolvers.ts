import { Resolver } from './../../interfaces/resolver';
import { GraphQLString } from 'graphql';
import { bookType } from './book';

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
