/**
 * Created by z on 18.12.2015.
 */

var FESIO = require('./configuration.js');
var DB_CFG = require('./db_config.js');

var p1 = require('./parser/portal_pravnych_predpisov_parser.js')(FESIO.portal_pravnych_predpisov);


p1.parse(function(res){

    console.log(res);

});