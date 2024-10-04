import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constans.js';

const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    };

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };
        
        return next();
    } catch (error) {
        res.clearCookie('auth');

        res.redirect('/auth/login');
    };
    
};

export {
    authMiddleware
};