import { Router } from "express";

import authService from "../services/authService.js";
import { creatErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    if (rePassword !== password) {
        return res.render('auth/register', { email, error: 'Password missmatch!' });
    }

    try {
        await authService.register(email, password);
    } catch (error) {
        return res.render('auth/register', { email, error: creatErrorMsg(error) });       
    };

    const token = await authService.login(email, password);
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);   
        res.cookie('auth', token, { httpOnly: true });
    } catch (error) {
        return res.render('auth/login', { email, error: creatErrorMsg(error) });
    }

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

export default router;