var mysql = require('mysql');
var express = require('express');

module.exports = connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'saket123',
        database: 'custom_project'
    }
);

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected!");
    } else {
        console.log("Error connecting database!");
    }
});
