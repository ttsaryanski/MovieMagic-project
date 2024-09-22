import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('movies/create')
});

router.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);

    res.redirect('/');
});

router.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    movie.ratingView = ratingViewData(movie.rating);

    res.render('movies/details', { movie })
});

function ratingViewData(rating) {
    if (!Number.isInteger(rating)) {
        return 'n\\a';
    };

    return '&#x2605'.repeat(rating);
}

export default router;