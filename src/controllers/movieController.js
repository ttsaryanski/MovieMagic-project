import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { checkOwner, checkNotOwner } from '../middlewares/ownerMiddleware.js';
import { createErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create')
});

router.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const ownerId = req.user?._id;

    try {
        await movieService.create(movieData, ownerId);

        res.redirect('/');
    } catch (error) {
        return res.render('movie/create', { error: createErrorMsg(error), movie: movieData });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query;

    try {
        const movies = await movieService.getAll(query).sort({ year: "desc" }).lean();
    
        res.render('home', { isSearch: true, movies, query }); 
    } catch (error) {
        return res.render('home', { isSearch: true, error: createErrorMsg(error)});
    }
});

router.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getById(movieId).lean();
        const isOwner = movie.owner && movie.owner == req.user?._id;
    
        res.render('movie/details', { movie, isOwner });   
    } catch (error) {
        return res.render('movie/details', { error: createErrorMsg(error)});
    }
});

router.get('/:movieId/attach', isAuth,  async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getById(movieId).lean();
        const casts = await castService.getAllWithout(movie.casts).lean();
    
        res.render('movie/attach', { movie, casts });   
    } catch (error) {
        return res.render('movie/attach', { error: createErrorMsg(error)});
    }
});

router.post('/:movieId/attach', isAuth,  async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();
    const casts = await castService.getAllWithout(movie.casts).lean();
    const castId = req.body.cast;
    const characterName = req.body.charName;

    try {
        await movieService.attach(movieId, castId, characterName);
    } catch (error) { 
        const errorMsg = createErrorMsg(error);

        return res.render('movie/attach', { error: errorMsg, movie, casts, characterName })
    }

    res.redirect(`/movies/${movieId}/details`);

});

router.get('/:movieId/delete', isAuth, checkOwner,  async (req, res) => {
    const movieId = req.params.movieId;

    try {
        await movieService.remove(movieId);

        res.redirect('/');
    } catch (error) {
        return res.render('404', { error: createErrorMsg(error)});
    }
});

router.get('/:movieId/edit', isAuth, checkOwner, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getById(movieId).lean();

        res.render('movie/edit', { movie });
    } catch (error) {
        return res.render('404', { error: createErrorMsg(error)});
    }
    
});

router.post('/:movieId/edit', isAuth, checkOwner, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    try {
        await movieService.edit(movieId, movieData);

        res.redirect(`/movies/${movieId}/details`);
    } catch (error) {
        const errorMsg = createErrorMsg(error);

        return res.render('movie/edit', { error: errorMsg, movie: movieData });
    }
});

export default router;