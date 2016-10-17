var mysql = require('mysql');
var log = require('debug-logger')('database.js'); 

<<<<<<< HEAD
module.exports = function Database() {
    var config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
    };

    //check if the user is using a password or not
    if(typeof connection !== undefined) {
        config.password = process.env.DB_PASSWORD;
    }

    //create the connection with the database
    var connection = mysql.createConnection(config);

    //connect to the database
=======
module.exports = function Database(config) {
    
    //create connection to database with provided details
    var connection = mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME 
    });
    
    //attempt connection
>>>>>>> a238800f2116ffe02875444d12a6dbba12844a6e
    connection.connect(function(err) {
        //failed attempt - log error
        if(err) {
            console.log("error: " + err.stack);
            return null;
        }
        //success
        else {
            console.log("success");
            return connection;
        }
    });
    
    return connection;
};
