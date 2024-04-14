import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY


export const verifyToken = (token: string, secretKey: string): any => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }

}

