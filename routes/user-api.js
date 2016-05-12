/*
 * Author: Deleepa
 * Description: Defines all the routes for the user table
 */

//init the required modules
var express = require('express');
var log = require('debug-logger')('user-api.js');

//init the express router
var router = express.Router();

//table name that this router is linked to
const TABLE_NAME = "user";


module.exports = function Router(db) {

    console.log('setting router..');
    /**
     * @param  {path} '/'
     * @param  {callback} function(req, res)
     * @desc This method will return all the users in the table
     */
    router.get('/' , function (req, res) {
        
        console.log('running user get function');        
        
        db.query('SELECT * FROM ' + TABLE_NAME, function(err, rows) {
           if(err) {
               res.status(500).json({
                   "status": false,
                   "message": err
               });
           } 
           else {
               res.status(200).json({
                   "status": true,
                   "message": rows
               });
           }
        });
    });
    
    return router;
};
