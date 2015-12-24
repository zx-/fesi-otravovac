/**
 * Created by z on 19.12.2015.
 */

var DB_CFG = require('./db_config.js');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_CFG.conString);

var pppMaterial = require('./model/pppMaterial')(sequelize);

pppMaterial.sync({force: true}).then(function () {

    console.log('created');

}, function(e){

    console.log(e);

});