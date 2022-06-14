import jwt from 'jsonwebtoken';
import { getSecret } from './generateSecret';

export const decodeToken = (token) => {
    const secret = getSecret();
    const decoded = jwt.verify(token, secret);

    return decoded;
}