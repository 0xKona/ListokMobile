import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const recipeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  desc: {
    type: String,
    required: false,
    unique: false,
  },
  createdBy: {
    type: String,
    required: true,
    unique: false,
  },
  createdOn: {
    type: String,
    required: true,
    unique: false,
  },
  public: {
    type: Boolean,
    required: true,
    unique: false,
  },
  picture: {
    type: String,
    required: false,
    unique: false,
  },
  ingredients: {
    type: String,
    required: false,
    unique: false,
  },
  method: {
    type: String,
    required: false,
    unique: false,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
