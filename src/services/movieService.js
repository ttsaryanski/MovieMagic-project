import Movie from "../models/Movie.js";

const getAll = (query = {}) => {
    let movies = Movie.find();
    
    if (query.search) {
        movies.find({ title: { $regex: query.search, $options: 'i' } });
    };

    if (query.genre) {
        movies.find({ genre: { $regex: query.genre, $options: 'i' } });
    };

    if (query.year) {
        movies.find({ year: query.year });
    };

    return movies;
};

const create = (movieData) => Movie.create(movieData);

const getById = (movieId) => Movie.findById(movieId).populate('casts');

const attach = (movieId, castId) => {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

export default {
    getAll,
    create,
    getById,
    attach
};