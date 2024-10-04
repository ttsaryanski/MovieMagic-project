import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constans.js';

const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    };

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        req.user = user;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;
        
        return next();
    } catch (error) {
        res.clearCookie('auth');

        res.redirect('/auth/login');
    };
    
};

export {
    authMiddleware
};