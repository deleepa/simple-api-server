/*
 * Author: Deleepa
 * Description: The entry point to the server application.
 */

//use require to init all the packages
var express = require('express');
var config = require('dotenv').config();
var connection = require('./database');
var userApi = require('./routes/user-api')(connection);
var bodyParser = require('body-parser');

//create the express application
var app = express();

//parse multipart forms : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse all application/json
app.use(bodyParser.json());

/**
 * @param  {path} '/'
 * @param  {callback} function(req, res)
 * @desc This function returns a string to tell the user to use the /api endpoints
 */
app.get('/', (req, res) => {
    res.send('hello world!');
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
