import { Router } from "express";
import castService from "../services/castService.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    await castService.create(castData);

    res.redirect('/');
});

export default router;