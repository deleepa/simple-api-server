/*
 * Author: Deleepa
 * Description: Defines all the routes for the user table
 */

//init the required modules
var express = require('express');
var log = require('debug-logger')('user-api.js');
var validator = require('validator');
var crypto = require('crypto');
var database = require('../utils/database.js');

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
       var con = connection();
       var query = '';
       
       //check if email is provided
       if(typeof req.params.email == 'undefined') {
            res.status(500).json({
                "status": false,
                "message": "Please provide a registered email."
            });

            return;
        }

        query = 'DELETE FROM ' + TABLE_NAME + ' WHERE email = "' + req.params.email + '"';

        database.executeQuery(query, res, req.params.email);
    });

    router.post('/', function (req, res) {
        console.log('posting to user table');
        //validate email address
        if(!validator.isEmail(req.body.email)) {
            res.status(500).json({
                "status": false,
                "message": "The email provided is not valid."
            });

            return;
        }
        //validate password length
        if(req.body.password.length < 8) {
            res.status(500).json({
                "status": false,
                "message": "The password must be at least 8 characters."
            });

            return;
        }

        //create hash of password before inserting to db
        var cipher = crypto.createCipher('aes192', CIPHER_SALT);
        var encryptedPass = cipher.update(req.body.password, 'utf-8', 'hex');
        encryptedPass += cipher.final('hex');

        var query = "INSERT INTO " + TABLE_NAME + " (email, password) " +
                    "VALUES ('" + req.body.email + "', '" + encryptedPass + "')";

        database.executeQuery(query, res, req.body.email);
    });

    router.put('/:email', function (req, res) {
        console.log('updating user table');

        //validate email address
        if(typeof req.params.email == 'undefined') {
            req.status(500).json({
               "status": false,
                "message": "Please provide a registered email!"
            });
            return;
        }

        //validate password length
        if(req.body.password.length < 8) {
            res.status(500).json({
                "status": false,
                "message": "The password must be at least 8 characters."
            });

            return;
        }

        var cipher = crypto.createCipher('aes192', CIPHER_SALT);
        var encryptedPass = cipher.update(req.body.password, 'utf-8', 'hex');
        encryptedPass += cipher.final('hex');

        var query = "UPDATE " + TABLE_NAME + " SET password = '" + encryptedPass +
                    "' WHERE email = '" + req.params.email + "'";

        database.executeQuery(query, res, req.params.email);
    });

    return router;
};