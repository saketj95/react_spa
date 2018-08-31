var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var exists = 0;
    var query = 'SELECT * FROM users';
    connection
        .query(query, function (err, row, field) {
            if (err) {
                throw (err);
            }
            if (row.length > 0) {
                for (var i = 0; i < row.length; i++) {
                    if (username === row[i].username) {
                        exists = 1;
                        break;
                    }
                }
            }
            if (exists) {
                res.json({
                    success: 0
                });
            } else {
                res.json({
                    success: 1
                });
            }
        });
});

module.exports = router;

