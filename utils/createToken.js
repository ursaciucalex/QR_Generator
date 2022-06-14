import jwt from 'jsonwebtoken';
import {getSecret} from './generateSecret.js';

export const createToken = (objectEncoded) => {
    const decoded = objectEncoded.toObject();
    console.log(objectEncoded.toString());
    const secret = getSecret();
    console.log(secret);
    const authToken = {id: decoded._id, email: decoded.email}
    const token = jwt.sign({authToken: authToken}, secret);

    return token;
}