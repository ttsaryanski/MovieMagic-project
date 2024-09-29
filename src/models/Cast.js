import { Schema, model, Types } from 'mongoose';

const castShema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    born: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    }
});

const Cast = model('Cast', castShema);

export default Cast;