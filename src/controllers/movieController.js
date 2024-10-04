import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('movie/create')
});

router.post('/create', async (req, res) => {
    const movieData = req.body;
    const ownerId = req.user?._id;

    await movieService.create(movieData, ownerId);

    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const query = req.query;
    const movies = await movieService.getAll(query).sort({ year: "desc" }).lean();

    res.render('home', { isSearch: true, movies, query });
});

router.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();

    const isOwner = req.user?._id == movie.owner;

    res.render('movie/details', { movie, isOwner })
});

router.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();
    const casts = await castService.getAllWithout(movie.casts).lean();

    res.render('movie/attach', { movie, casts });
});

router.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const characterName = req.body.charName;

    await movieService.attach(movieId, castId, characterName);

    res.redirect(`/movies/${movieId}/details`);

});

router.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.remove(movieId);

    res.redirect('/');
});

router.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();

    res.render('movie/edit', { movie });
});

router.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.edit(movieId, movieData).lean();

    res.redirect(`/movies/${movieId}/details`);
});

export default router;