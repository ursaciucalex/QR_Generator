import crypto from 'crypto';
import 'dotenv/config';

export const getSecret = () => {

    const secret = process.env.SECRET;
    //console.log(secret);
    const hash = crypto.createHmac('sha256', secret).update(process.env.UPDATE_SECRET).digest('hex');
    return hash;
}