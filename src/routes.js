import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieControler from './controllers/movieController.js';

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);

export default router;