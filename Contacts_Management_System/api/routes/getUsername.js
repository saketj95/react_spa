var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var query = 'SELECT username FROM users where username = "' + username+'" ';
    connection
        .query(query, function (err, row, field) {
            if (err) {
                throw (err);
            }
            if (row.length > 0) {
                res.json({
                    username: row[0].username,
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
