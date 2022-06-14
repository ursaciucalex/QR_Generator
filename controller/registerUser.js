import User from '../model/userSchema.js';
import bcrypt from 'bcrypt';
import {check} from 'express-validator';
import { createToken } from '../utils/createToken.js';

const registerUser = async (req, res, next) => {
    const errors = check(req);
    const userMail = await User.findOne({ email: req.body.email });

    if(userMail){
        res.status(409).json({
            error:'User already registered with this email address!'
        });
        return 0;
    }
    const userPhone = await User.findOne({ phone: req.body.phone });

    if(userPhone) {
        res.status(409).json({
            message: 'User already registered with this phone number!', 
            error: errors
        });
        return 0;
    }
    const newUser = new User({
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        age: req.body.age,
        email:  req.body.email,
        phone:  req.body.phone,
        password:  req.body.password,
        sex:  req.body.sex,
        lastSchool: req.body.lastSchool
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    
    newUser.save()
        .then(result => {
            result.loggedIn = true;
            result.password = undefined;
            res.status(201).json({
                message: 'New user added!',
                user: result,
                token: token
            })
        })
        .catch(err => {
            res.status(400).send(err);
        });

};
export default  registerUser;