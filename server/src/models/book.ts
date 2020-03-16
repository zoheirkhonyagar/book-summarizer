import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

export default mongoose.model('Book', bookSchema);
