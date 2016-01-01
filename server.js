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

var pppMaterial = require('./model/pppMaterial')(sequelize);
var nkuMaterial = require('./model/nkuMaterial')(sequelize);
var rokovaniaMaterial = require('./model/rokovaniaMaterial')(sequelize);
var supremeCourtMaterial = require('./model/supremeCourtMaterial')(sequelize);
var uvoMaterial = require('./model/uvoMaterial')(sequelize);
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

app.get('/api/pppMaterial', function(req,res){

    pppMaterial.findAll({
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

app.get('/api/nkuMaterial', function(req,res){

    nkuMaterial.findAll({
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

app.get('/api/rokovaniaMaterial', function(req,res){

    rokovaniaMaterial.findAll({
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

app.get('/api/supremeCourtMaterial', function(req,res){

    supremeCourtMaterial.findAll({
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

app.get('/api/uvoMaterial', function(req,res){

    uvoMaterial.findAll({
        order: [['date','DESC']],
        limit: 40
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
    res.sendFile(__dirname + '/frontend/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(port);
console.log("App listening on port ",port);


/// CRAWLER


var taskswrapper = require('./taskwrapper.js');

var CronJob = require('cron').CronJob;

new CronJob('00 */30 * * * *', function() {

    taskswrapper.checkSites();

}, null, true, 'Europe/Bratislava');

new CronJob('00 04 06 * * *', function() {

    taskswrapper.sendDaily();

}, null, true, 'Europe/Bratislava');

new CronJob('00 14 06 * * *', function() {

    taskswrapper.clearBuffer();

}, null, true, 'Europe/Bratislava');
















