var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var query = 'SELECT * FROM users where username = "' + username+'" ';
    connection
        .query(query, function (err, row, field) {
            if (err) {
                throw (err);
			}
            if (row.length > 0) {
                res.json({
					profile_fname: row[0].firstname,
					profile_lname: row[0].lastname,
					profile_uname: row[0].username,
					profile_mobileno: row[0].mobileno,
					profile_email: row[0].email_id,
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
