import { GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import { Field } from '../../interfaces/field';
import { quoteType } from './quote';
import Quote from '../../models/quote';

// define queries
// define quotes field
const quotes: Field = {
  type: GraphQLList(quoteType),
  resolve(parent, args) {
    return Quote.find({});
  }
};

// define mutations

export default {
  query: {
    quotes
  },
  mutation: {}
};
