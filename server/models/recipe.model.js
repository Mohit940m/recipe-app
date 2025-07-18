
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  preparationTime: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
