import jwt from 'jsonwebtoken';
import { getSecret } from './generateSecret.js';
import User from "../model/userSchema.js";

const validateToken = async (req, res, next) => {
    
    const auhorizationHeader = req.headers.authorization;

    let result;

    if (!auhorizationHeader) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    
    const secret = getSecret();

    try {
        result = jwt.verify(token, secret);
        
        let usedByResponse = await User.findById(result.authToken.id);

        if (!usedByResponse) {
            result = {
                error: true,
                message: "Authorization error",
            };

            return res.status(403).json(result);
        }
        

        if (!usedByResponse.email === result.email) {
            result = {
                error: true,
                message: "Invalid token",
            };

            return res.status(401).json(result);
        }
    

        req.decoded = result;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                error: true,
                message: "Token expired",
            });
        }

        return res.status(403).json({
            error: true,
            message: error,
        });
    }
}

export default validateToken;