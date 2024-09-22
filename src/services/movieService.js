import moviesData from "../data/movieData.js";
import uniqid from 'uniqid';

const getAll = () => moviesData.getAll();

const create = (movieData) => {
    movieData.id = uniqid();

    return moviesData.create(movieData)
};

const getById = async (movieId) => {
    const movies = await moviesData.getAll();
    const result = movies.find(movie => movie.id == movieId);

    return result;
};

export default {
    getAll,
    create,
    getById
};