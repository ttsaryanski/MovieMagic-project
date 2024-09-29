import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieControler from './controllers/movieController.js';
import castController from './controllers/castController.js';

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);
router.use('/casts', castController);

router.use('*', (req, res) => {
    res.render('404');
})

export default router;