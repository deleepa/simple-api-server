/*
 * Author: Deleepa
 * Description: Defines all the routes for the user table
 */

//init the required modules
var express = require('express');
var log = require('debug-logger')('user-api.js');;
var database = require('../utils/database.js');
var helper = require('../utils/helper.js');
var validator = require('validator');

//init the express router
var router = express.Router();

//table name that this router is linked to
const TABLE_NAME = "user";

//salt to be used with cipher
const CIPHER_SALT = "salt";

module.exports = function Router(connection) {

    console.log('setting router..');
    /**
     * @param  {path} '/'
     * @param  {callback} function(req, res)
     * @desc This method will return all the users in the table
     */
    router.get('/' , function (req, res) {
        console.log('retrieving users');

        var query = '';

        //check if user is specifying an email
        if(typeof req.query.email !== 'undefined') {
            query = 'SELECT * FROM ' + TABLE_NAME + ' WHERE email = "' + req.query.email + '"';
        } else {
            query = 'SELECT * FROM ' + TABLE_NAME;
        }

        database.executeGetQuery(query, res);
    });
    
    router.delete('/:email', function (req, res) {
        console.log('deleting provided user from user table');

        helper.checkEmail(req.params.email, res);

        var query = 'DELETE FROM ' + TABLE_NAME + ' WHERE email = "' + req.params.email + '"';

        database.executeQuery(query, res, req.params.email);
    });

    router.post('/', function (req, res) {
        console.log('posting to user table');

        helper.validateEmail(req.body.email, res);
        helper.validatePassword(req.body.password, res);

        var encryptedPass = helper.encryptPassword(req.body.password);

        var query = "INSERT INTO " + TABLE_NAME + " (email, password) " +
                    "VALUES ('" + req.body.email + "', '" + encryptedPass + "')";

        database.executeQuery(query, res, req.body.email);
    });

    router.put('/:email', function (req, res) {
        console.log('updating user table');

        helper.checkEmail(req.params.email, res);
        helper.validatePassword(req.body.password, res);

        var encryptedPass = helper.encryptPassword(req.body.password);

        var query = "UPDATE " + TABLE_NAME + " SET password = '" + encryptedPass +
                    "' WHERE email = '" + req.params.email + "'";

        database.executeQuery(query, res, req.params.email);
    });

    return router;
};