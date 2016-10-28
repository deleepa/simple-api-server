/*
 * Author: Deleepa
 * Description: The entry point to the server application.
 */

//use require to init all the packages
import express from 'express';
import bodyParser from 'body-parser';
import userApi from './routes/user-api';


//create the express application
const app = express();

//parse multipart forms : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse all application/json
app.use(bodyParser.json());

/**
 * @param  {path} '/'
 * @param  {callback} function(req, res)
 * @desc This function returns a string to tell the user to use the /api endpoints
 */
app.get('/', (request, response) => {
    response.send('hello world!');
});

/**
 * @param  {path} '/api/users'
 * @param  {router} userApi
 * @desc This is where the middleware for the user api is being set
 */
app.use('/api/users', userApi);

/**
 * @param  {port} 3000
 * @param  {callback} function()
 * @desc This function starts the server
 */
app.listen(3000, () => {
    console.log('server is listening at port 3000..');
});
