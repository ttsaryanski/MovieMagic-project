import Cast from '../models/Cast.js';

const getAll = () => Cast.find();

const create = (castData) => Cast.create(castData);

export default {
    getAll,
    create
};