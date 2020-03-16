import { Schema } from 'mongoose';

const Book = new Schema({
  name: String,
  genre: String,
  authorId: String
});

export default Book;
