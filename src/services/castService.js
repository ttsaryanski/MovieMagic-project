import Cast from '../models/Cast.js';

const getAll = () => Cast.find();

const create = (castData) => Cast.create(castData);

const getAllWithout = (casts = []) => {
    const castsId = casts.map(cast => cast.cast._id);
    return Cast.find({ _id: { $nin: castsId } });
};

export default {
    getAll,
    create,
    getAllWithout
};