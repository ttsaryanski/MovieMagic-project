import jwt from '../lib/jwt.js';
import { JWT_SECRET } from '../config/constans.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    };

    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET);

        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        req.user = user;
        req.isAuthenticated = true;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;
        
        return next();
    } catch (error) {
        res.clearCookie('auth');

        res.redirect('/auth/login');
    };
    
};

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }

    return next();
};

const isGuest = (req, res, next) => {
    if (!req.isAuthenticated) {
        return next();
    }

    return res.render('home', { error: 'You are already registered and logged!'});
}

export {
    authMiddleware,
    isAuth,
    isGuest
};