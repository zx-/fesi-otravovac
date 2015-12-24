/**
 * Created by z on 18.12.2015.
 */

    // CONFIGS
var FESIO = require('./configuration.js');
var DB_CFG = require('./db_config.js');


// MODEL
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_CFG.conString);
var pppMaterial = require('./model/pppMaterial')(sequelize);

// PARSERS
var p1 = require('./parser/ppp_parser.js')(FESIO.portal_pravnych_predpisov);



p1.parse(function(res){

    for(var i = 0; i < res.length; i++) {

        pppMaterial.create(res[i]);

    }

});