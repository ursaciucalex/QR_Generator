import express from 'express'

const userRoutes = express.Router();

import registerUser from '../controller/registerUser.js';

import loginUser from '../controller/loginUser.js';

import qrcode from '../controller/qr.js';

import logoutUser from '../controller/logoutUser.js';
//path
userRoutes.use('/loginUser', loginUser);
userRoutes.use('/registerUser',registerUser);
userRoutes.use('/qr', qrcode);
userRoutes.use('/logoutUser',logoutUser);
export default userRoutes;