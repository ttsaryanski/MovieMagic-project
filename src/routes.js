import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieControler from './controllers/movieController.js';

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);

router.use('*', (req, res) => {
    res.render('404');
})

export default router;