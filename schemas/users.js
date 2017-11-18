const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        lowercase: true
    },
    registry: {
        type: String,
        required: [true, 'Registry ID is required'],
        unique: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, 'E-mail is required'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    user_type: {
        type: String,
        enum: ['administrator', 'student'],
        required: [true, 'User type is required'],
        lowercase: true
    }
});

UserSchema.plugin(uniqueValidator, { message: 'Error, already have this {PATH} registered.' });
const model = mongoose.model('user', UserSchema, 'users');
module.exports = model;