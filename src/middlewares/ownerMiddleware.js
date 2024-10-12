import movieService from "../services/movieService.js";

const checkOwner = async (req, res, next) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    if (movie.owner == req.user?._id) {
        return next();
    } else {
        return res.render('404', { error: 'You are not authorized for this action!' });
    }
};

const checkNotOwner = async (req, res, next) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    if (movie.owner != req.user?._id) {
        return next();
    } else {
        return res.render('404', { error: 'You are not authorized for this action!' });
    }
};

export {
    checkOwner,
    checkNotOwner
}