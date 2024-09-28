import Movies from "../models/Movies.js";

const getAll = (query = {}) => {
    let movies = Movies.find();
    
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

const create = (movieData) => Movies.create(movieData);

const getById = (movieId) => Movies.findById(movieId);

export default {
    getAll,
    create,
    getById
};