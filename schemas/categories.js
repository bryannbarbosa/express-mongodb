const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ComparisonsSchema = new Schema({
    url_image: {
        type: String
    }
});

const StepsSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    step_type: {
        enum: ['image', 'text'],
    },
    url_image: {
        type: String,
        default: null
    }
});

const ExerciseSchema = new Schema({
    title: {
        type: String
    },
    steps: [StepsSchema],
    comparisons: [ComparisonsSchema]
});

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    exercises: [ExerciseSchema],
});

CategorySchema.plugin(uniqueValidator, { message: 'Error, already have this {PATH} registered.' });
const model = mongoose.model('categories', CategorySchema, 'categories');
module.exports = model;