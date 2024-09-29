import { Schema, model, Types } from 'mongoose';

const castShema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String
});

const Cast = model('Cast', castShema);

export default Cast;