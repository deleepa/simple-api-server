import mysql from 'mysql';

class Database {
    constructor() {
        this.config = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            database: process.env.DB_NAME || 'simple-api-server'
        };
    }

    connection() {
        //create the connection with the database
        const connection = mysql.createConnection(this.config);

        connection.connect(function(err) {
            //failed attempt - log error
            if(err) {
                console.error('error: ' + err.stack);
                return null;
            }
            //success
            else {
                console.log('success');
                return connection;
            }
        });

        return connection;
    }
}

export default new Database();
