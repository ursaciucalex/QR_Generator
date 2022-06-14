import express from 'express';
import connection from 'mongoose';

import cors from 'cors';
import bodyparser from 'body-parser';

const {connect} = connection;

import userRoutes from './routes/userRoutes.js';

connect(`mongodb+srv://ursaciucalex:alexandru01@database.yniwz.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected To Database')
  }).catch((err) => {
    console.log('Connection Failed'),
    console.log(err)
  });

//Variable for app using express functionalities
const app = express();

//Express functionality for cors (safe) connection and authentification
app.use(cors({origin: true, credentials: true}));

//Express functionality for increase the json data parsed via body request
app.use(bodyparser.json({limit: '500mb'}));

//Express functionality for increase the json data parsed via urlencoded request
app.use(bodyparser.urlencoded({limit: '500mb', extended: true}));

//Express functionality for parsing data as a json format
app.use(bodyparser.json());

app.use('/qr', userRoutes);

//Express functionality for port used on listening for requests
app.listen(3000,()=>  {console.log('Server is running on http://localhost:3000')});



