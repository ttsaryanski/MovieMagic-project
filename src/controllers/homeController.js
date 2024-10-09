import { Router } from 'express';
import movieService from '../services/movieService.js';
import { createErrorMsg } from '../utils/errorUtil.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const movies = await movieService.getAll().sort({ year: 'desc'}).lean();
        
        res.render('home', { movies });
    } catch (error) {
        console.log(error);
        
        res.render('home', { error: createErrorMsg(error) });
    }

});

router.get('/about', (req, res) => {
    res.render('home/about');
});

export default router;