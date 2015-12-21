/**
 * Created by z on 21.12.2015.
 */

var express = require('express');
var bodyParser = require('body-parser');

var DB_CFG = require('./db_config.js');
var FESIO = require('./configuration.js');

// MODEL
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_CFG.conString);
var Material = require('./model/material')(sequelize);

// server

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));

var port = FESIO.server.port || 8080;


//router.get('/',function(req,res){
//
//    res.json({message:"Hello this is fesi-otravovac api :)"});
//
//});

app.get('/api/material', function(req,res){

        Material.findAll({
            order: [['date','DESC']],
            limit: 10
        }).then(
            function (a) {

                res.json(a);

            },
            function (a) {

                res.json(a);

            }
        );

    });


app.get('*', function(req, res) {
    res.sendfile('./frontend/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});





app.listen(port);
console.log("App listening on port ",port);