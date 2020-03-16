import bookFields from './book/resolvers';
import greetingFields from './greeting/resolvers';

export default {
  ...bookFields,
  ...greetingFields
};
