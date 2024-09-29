import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('movie/create')
});

router.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);

    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const query = req.query;
    const movies = await movieService.getAll(query).sort({ year: "desc" }).lean();

    res.render('home', { isSearch: true, movies, query });
});

router.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();

    movie.ratingView = ratingViewData(movie.rating);

    res.render('movie/details', { movie })
});

function ratingViewData(rating) {
    if (!Number.isInteger(rating)) {
        return 'n\\a';
    };

    return '&#x2605'.repeat(rating);
}

export default router;