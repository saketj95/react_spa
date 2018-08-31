var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var loggedin;
    var query = 'SELECT * FROM users where username = "' + username + '" AND password ="' + password + '"';
    connection
        .query(query, function (err, row, field) {
            if (err) {
                throw (err);
            }
            if (row.length > 0) {
                var query1 = 'UPDATE users SET loggedin="1" where username = "' + username + '" AND password ="' + password + '"';
                connection
                    .query(query1, function (err1, row1, field1) {
                        if (err1) {
                            throw (err1);
                        }
                    });
                res.json({
                    username: row[0].username,
                    loggedin: row[0].loggedin,
                    success: 1
                });
            } else {
                res.json({
                    success: 0
                });
            }
        });
});

module.exports = router;
