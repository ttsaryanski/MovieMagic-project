import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userShema = new Schema({
    email: String,
    password: {
        type: String
    }
});

userShema.pre('save', async function () {
    const hash =  await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = model('User', userShema);

export default User;
