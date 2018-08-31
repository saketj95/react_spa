var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
            var username = req.body.username;
            var password = req.body.password;
			var email = req.body.email;
			var firstname = req.body.firstname;
			var lastname = req.body.lastname;
			var mobileno = req.body.mobileno;
			var query = 'INSERT INTO users (firstname, lastname, username, password, mobileno, email_id ) VALUES ("'+ firstname +'","'+ lastname +'","'+ username +'","'+ password +'","'+ mobileno +'","'+ email +'")';
			console.log(query);
            connection.query(query, function (err, results) {
                if (err)
                    res.json({success: 0, err: err});
                else
                    res.json({success: 1})
                res.end();
            });
});

module.exports = router;
