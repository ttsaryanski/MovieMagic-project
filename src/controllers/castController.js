import { Router } from "express";
import castService from "../services/castService.js";
import { createErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    try {
        await castService.create(castData);
    } catch (error) {
        const errorMsg = createErrorMsg(error);

        return res.render('cast/create', { error: errorMsg, cast: castData })
    }

    res.redirect('/');
});

export default router;