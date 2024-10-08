import { Schema, model, Types } from 'mongoose';

const castShema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required!'],
        minLength: [5, 'Cast must be 5 or more characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Cast can contain only alpha numeric characters!']
    },
    age: {
        type: Number,
        required: [true, 'Cast age is required!'],
        min: [1, 'Cast must be older than 1!'],
        max: [120, 'Cast must be younger than 120!']
    },
    born: {
        type: String,
        required: [true, 'Cast born is required!'],
        minLength: [2, 'Cast born must be 2 or more characters!'],
        validate: [/^[A-Za-z0-9 \.\,]+$/, 'Cast can contain only alpha numeric characters!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Cast image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    }
});

const Cast = model('Cast', castShema);

export default Cast;