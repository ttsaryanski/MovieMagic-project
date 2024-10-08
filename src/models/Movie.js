import { Schema, model, Types } from 'mongoose';

const movieShema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie Title is required!'],
        minLength: [5, 'Title must be 5 or more characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Title can contain only alpha numeric characters!']
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required!'],
        minLength: [5, 'Genre must be 5 or more characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Genre can contain only alpha numeric characters!']
    },
    director: {
        type: String,
        required: [true, 'Movie director is required!'],
        minLength: [5, 'Director must be 5 or more characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Director can contain only alpha numeric characters!']
    },
    year: {
        type: Number,
        required: [true, 'Movie year is required!'],
        min: [1900, 'Cannot add movies older than 1900 year!'],
        max: [2024, 'Cannot add movies by new from 2024 year!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    rating: {
        type: Number,
        required: [true, 'Movie rating is required!'],
        min: [1, 'Rating should be at least 1!'],
        max: [10, 'Rating cannot be higher than 10!'],
    },
    description: {
        type: String,
        required: [true, 'Movie description is required!'],
        validate: [/^[A-Za-z0-9 \.\,\'\-]+$/, 'Description can contain only alpha numeric characters!'],
        minLength: [20, 'Description should be at least 20 characters long!'],
        maxLength: [500, 'Description should be no more than 500 characters long!']
    },
    casts: [{
        characterName: {
            type: String,
            required: [true, 'Character name is required!'],
            minLength: [2, 'Character name must be 2 or more characters!'],
            validate: [/^[A-Za-z0-9 ]+$/, 'Character name can contain only alpha numeric characters!']
        },
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        }
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Movie = model('Movie', movieShema);

export default Movie;