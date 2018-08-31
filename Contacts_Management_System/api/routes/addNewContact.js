var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
	var fullname = req.body.fullname;
	var mobileno = req.body.mobileno;
	var email = req.body.email;
	var username = req.body.username;
	var query = 'INSERT INTO `contact_data` (contact_name, contact_number, email, username) VALUES ("' + fullname + '","' + mobileno + '", "' + email +'", "' + username + '")';
	console.log(query);
	connection.query(query, function (err, results) {
		if (err){
			console.log("ERR");
			res.json({ success: 0, err: err });
		}
		else{
			res.json({ success: 1 })
			console.log("NO ERR");
		}
		res.end();
	});
});

module.exports = router;
