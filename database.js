var mysql = require('mysql');
var log = require('debug-logger')('database.js');

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
