import moviesData from "../data/movieData.js";
import uniqid from 'uniqid';

const getAll = async (query = {}) => {
    let movies = await moviesData.getAll();
    
    if (query.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().startsWith(query.search.toLowerCase()));
    };

    if (query.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(query.genre.toLowerCase()));
    };

    if (query.year) {
        movies = movies.filter(movie => movie.year === query.year);
    };

    return movies;
};

const create = (movieData) => {
    movieData.id = uniqid();
    movieData.rating = Number(movieData.rating);

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