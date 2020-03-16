import mongoose, { Schema } from 'mongoose';

const authorSchema = new Schema({
  name: String,
  age: Number
});

export default mongoose.model('Author', authorSchema);
