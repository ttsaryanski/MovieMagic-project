import Cast from '../models/Cast.js';

const getAll = () => Cast.find();

const create = (castData) => Cast.create(castData);

const getAllWithout = (castsId) => Cast.find().nin('_id', castsId);

export default {
    getAll,
    create,
    getAllWithout
};