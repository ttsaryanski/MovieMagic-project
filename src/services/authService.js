import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const SECRET = 'rVc1dnSI2uWpxq21T78IXnNiGOIaAy31'

const register = (email, password) => {


    return User.create({ email, password });
}

const login = async(email, password) => {
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
    const token = jwt.sign(payload, SECRET, { expiresIn: '2h'});

    return token;
};
    

export default {
    register,
    login
};