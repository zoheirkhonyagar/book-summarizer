import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

export default mongoose.model('Book', BookSchema);
