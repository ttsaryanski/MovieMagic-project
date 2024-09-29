import Cast from '../models/Cast.js';

const create = (castData) => Cast.create(castData);

export default {
    create
};