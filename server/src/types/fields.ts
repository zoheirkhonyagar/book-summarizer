import bookFields from './book/fields';
import greetingFields from './greeting/fields';

export default {
  query: {
    ...bookFields.query,
    ...greetingFields.query
  },
  mutation: {
    ...bookFields.mutation,
    ...greetingFields.mutation
  }
};
