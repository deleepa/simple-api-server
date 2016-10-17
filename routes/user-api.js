/*
 * Author: Deleepa
 * Description: Defines all the routes for the user table
 */

//init the required modules
var express = require('express');
var log = require('debug-logger')('user-api.js');
var validator = require('validator');
var crypto = require('crypto');

//init the express router
var router = express.Router();

//table name that this router is linked to
const TABLE_NAME = "user";

//salt to be used with cipher
const CIPHER_SALT = "salt";

module.exports = function Router(db) {

    console.log('setting router..');
    /**
     * @param  {path} '/'
     * @param  {callback} function(req, res)
     * @desc This method will return all the users in the table
     */
    router.get('/' , function (req, res) {        
        
        db.query('SELECT * FROM ' + TABLE_NAME, function(err, rows) {
           if(err) {
               res.status(500).json({
                   "status": false,
                   "message": err
               });
               
               return;
           } 
           else {
               res.status(200).json({
                   "status": true,
                   "message": rows
               });
               
               return;
           }
        });
    });
    
    router.post('/', function (req, res) {
        console.log('posting to user table');
        console.log(req.body);
        
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
        
        var cipher = crypto.createCipher('aes192', CIPHER_SALT);
        var encryptedPass = cipher.update(eq.body.password, 'utf-8', 'hex');
        encryptedPass += cipher.final('hex');
        
        var query = "INSERT INTO " + TABLE_NAME + " (email, password, package_id) " + 
                    "VALUES ('" + req.body.email + "', '" + req.body.password + "', 1)";
                    
        console.log(query);
        
        db.query(query, function(err, rows) {
           if(err) {
               res.status(500).json({
                   "status": false,
                   "message": err
               });
               
               return;
           } 
           else {
               res.status(200).json({
                   "status": true,
                   "message": rows
               });
               
               return;
           }
        });
    });
    
    return router;
};
