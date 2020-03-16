import mongoose, { Schema } from 'mongoose';

const AuthorSchema = new Schema({
  name: String,
  age: Number
});

export default mongoose.model('Author', AuthorSchema);
