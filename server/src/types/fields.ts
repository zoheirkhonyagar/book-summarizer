import greetingFields from './greeting/fields';
import bookFields from './book/fields';
import authorFields from './author/fields';
import quoteFields from './quote/fields';

export default {
  query: {
    ...bookFields.query,
    ...greetingFields.query,
    ...authorFields.query,
    ...quoteFields.query
  },
  mutation: {
    ...bookFields.mutation,
    ...greetingFields.mutation,
    ...authorFields.mutation,
    ...quoteFields.mutation
  }
};
