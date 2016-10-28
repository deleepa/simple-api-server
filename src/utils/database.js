import database from '../database';

export function executeQuery(query, response, email) {
    const connection = database.connection();
    connection.query(
        query,
        // removed unused rows argument
        function (err) {
            if (err) {
                response.status(500).json({
                    status  : false,
                    message : err
                });
            }
            else {
                response.status(200).json({
                    status  : true,
                    message : [{
                        email : email
                    }]
                });
            }
        }
    );
}

export function executeGetQuery(query, response) {
    const connection = database.connection();
    connection.query(
        query,
        function (err, rows) {
            if (err) {
                response.status(500).json({
                    status  : false,
                    message : err
                });
            }
            else {
                response.status(200).json({
                    status  : true,
                    message : rows
                });
            }
        }
    );
}
