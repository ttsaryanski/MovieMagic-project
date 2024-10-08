import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userShema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, 'Invalid email address!'],
        minLength: [10, 'Email must be 10 or more characters']
    },
    password: {
        type: String,
        validate: [/^[A-Za-z0-9]+$/, 'Invalid password characters!'],
        minLength: [6, 'Password must be 6 or more characters']
    }
});

userShema.pre('save', async function () {
    const hash =  await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = model('User', userShema);

export default User;
