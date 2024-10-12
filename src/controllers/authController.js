import { Router } from "express";

import authService from "../services/authService.js";
import { createErrorMsg } from "../utils/errorUtil.js";
import { isGuest, isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { email, password, rePassword } = req.body;

    if (rePassword !== password) {
        return res.render('auth/register', { email, error: 'Password missmatch!' });
    }

    try {
        await authService.register(email, password);

        const token = await authService.login(email, password);   
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        return res.render('auth/register', { email, error: createErrorMsg(error) });       
    };

});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);   
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        return res.render('auth/login', { email, error: createErrorMsg(error) });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

export default router;