import { Schema, model, Types } from 'mongoose';

const movieShema = new Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        min: 1900,
        max: 2050
    },
    imageUrl: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max:10
    },
    description: {
        type: String,
        require: true,
        maxLength: 100
    },
    casts: [{
        // _id: false,
        characterName: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        }
    }]
});

const Movie = model('Movie', movieShema);

export default Movie;