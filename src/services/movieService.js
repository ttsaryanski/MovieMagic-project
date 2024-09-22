import moviesData from "../data/movieData.js";
import uniqid from 'uniqid';

const getAll = () => moviesData.getAll();

const create = (movieData) => {
    movieData.id = uniqid();

    return moviesData.create(movieData)
};

export default {
    getAll,
    create
};