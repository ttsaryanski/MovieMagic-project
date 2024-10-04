import User from "../models/User.js";

const register = (email, password) => User.create({ email, password });
    

export default {
    register
};