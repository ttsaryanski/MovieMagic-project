import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';

import User from "../models/User.js";
import { JWT_SECRET } from '../config/constans.js';


<<<<<<< HEAD
const register = async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
=======
const register = (email, password) => {
    const count = User.countDocuments({ email });
    if (count > 0) {
>>>>>>> cc6343f48ac6b9a9675b55ea034581811f5b8565
        throw new Error('User already exists') ;
    }

    return User.create({ email, password });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('User does not exist!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match!');
    };

    const payload = {
        _id: user._id,
        email
    };
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h'});

    return token;
};
    

export default {
    register,
    login
};