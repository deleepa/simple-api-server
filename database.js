var mysql = require('mysql');
var log = require('debug-logger')('database.js'); 

module.exports = function Database(config) {
    
    var connection = mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME 
    });
      
    connection.connect(function(err) {
        if(err) {
            console.log("error: " + err.stack);
            return null;
        }
        else {
            console.log("success");
            return connection;
        }
    });
    
    return connection;
};