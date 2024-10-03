import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieControler from './controllers/movieController.js';
import castController from './controllers/castController.js';
import authController from './controllers/authController.js';

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);
router.use('/casts', castController);
router.use('/auth', authController);

router.use('*', (req, res) => {
    res.render('404');
})

export default router;