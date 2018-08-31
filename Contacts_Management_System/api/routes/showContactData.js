var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
	var username = req.body.username;
    var query = 'SELECT * FROM contact_data where username = "' + username+'" ';
    connection.query(query, function (err, row, field) {debugger;
		console.log(query);
            if (err) {
                throw (err);
            }
            console.log(row.length);
            if (row.length > 0) {
                var contact_name = [], contact_number = [], email = [];
                for (var i = 0; i < row.length; i++) {
                    contact_name[i] = row[i].contact_name;
                    contact_number[i] = row[i].contact_number;
                    email[i] = row[i].email;
                }
                res.json({
                    contact_name: contact_name,
                    contact_number: contact_number,
                    email: email,
                    count: row.length,
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
