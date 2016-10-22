var connection = require('../database');

module.exports = {

    executeQuery: function(query, res, email) {
        var con = connection();
        con.query(query, function (err, rows) {
            if (err) {
                res.status(500).json({
                    "status": false,
                    "message": err
                });
                return;
            }
            else {
                res.status(200).json({
                    "status": true,
                    "message": [{
                        "email" : email
                    }]
                });
                return;
            }
        });
    },

    executeGetQuery: function(query, res) {
        var con = connection();
        con.query(query, function (err, rows) {
            if (err) {
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
    }
}