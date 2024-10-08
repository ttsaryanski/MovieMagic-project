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

const create = (movieData, ownerId) => Movie.create({...movieData, owner: ownerId});

const getById = (movieId) => Movie.findById(movieId).populate('casts.cast');

const remove = (movieId) => Movie.findByIdAndDelete(movieId);

const edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData, { runValidators: true });

const attach = (movieId, castId, characterName) => {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: { cast: castId, characterName } } }, { runValidators: true });
};

export default {
    getAll,
    create,
    getById,
    remove,
    edit,
    attach
};