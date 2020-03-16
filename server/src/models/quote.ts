import mongoose, { Schema } from 'mongoose';

const quoteSchema = new Schema({
  text: String,
  bookId: String
});

export default mongoose.model('Quote', quoteSchema);
