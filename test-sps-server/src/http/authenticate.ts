import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwtUtils';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authToken && authToken.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, id) => {
        if (err) return res.sendStatus(403);
        req.id = id;
        next();
    });
};
