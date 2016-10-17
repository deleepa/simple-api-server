var mysql = require('mysql');
var log = require('debug-logger')('database.js'); 

module.exports = function Database(config) {
    
    //create connection to database with provided details
    var connection = mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME 
    });
    
    //attempt connection
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
