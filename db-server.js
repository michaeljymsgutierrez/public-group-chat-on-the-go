'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');
var port = process.env.Port || 4000;

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat'
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/query', function(req, res) {
    res.send("mysql has been intialized");
});

app.post('/api/query', function(req, res) {
    var query = req.body.query;
    var param = req.body.param;
    connection.query(query, param, function(error, response, fields) {
        if (error) {
            res.json(error);
        } else {
            res.json(response);
        }
    });
});


app.listen(port, '0.0.0.0', function() {
    console.log("Running on port " + port);
});