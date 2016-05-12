/*
 * Author: Deleepa
 * Description: The entry point to the server application.
 */

//use require to init all the packages
var express = require('express');
var config = require('./config');
var database = require('./database')(config);
var userApi = require('./routes/user-api')(database);

//create the express application
var app = express();

/**
 * @param  {path} '/'
 * @param  {callback} function(req, res)
 * @desc This function returns a string to tell the user to use the /api endpoints
 */
app.get('/', function(req, res) {
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
app.listen(3000, function() {
    console.log('server is listening at port 3000..');
  });
