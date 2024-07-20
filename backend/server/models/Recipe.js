import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
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
  createdByName: {
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
