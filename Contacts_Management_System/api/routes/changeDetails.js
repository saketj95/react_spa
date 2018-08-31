var express = require('express');
var router = express.Router();
var connection = require('./connection/connection');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email_id = req.body.email;
    var mobileno = req.body.mobileno;
    var query = 'UPDATE users SET firstname = "' + firstname + '", lastname = "' + lastname + '", email_id = "' + email_id + '", mobileno ="' + mobileno + '"where username="' + username + '"';
    connection.query(query, function (err, row, field) {
        if (err) {
            throw (err);
        }
    });
    res.json({
        success: 1
    });
}); 

module.exports = router;
