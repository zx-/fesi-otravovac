/**
 * Created by z on 18.12.2015.
 */

    // CONFIGS
var FESIO = require('./configuration.js');
var DB_CFG = require('./db_config.js');


// MODEL
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_CFG.conString);


var sites = {
    ppp : {

        parser : require('./parser/ppp_parser.js')(FESIO.portal_pravnych_predpisov),
        model: require('./model/pppMaterial.js')(sequelize)

    },
    nku: {
        parser: require('./parser/nku_parser.js')(FESIO.nku),
        model: require('./model/nkuMaterial.js')(sequelize)
    }
};

for(var p in sites) {

    var site = sites[p];

    site.parser.parse(function (res) {

        for (var i = 0; i < res.length; i++) {

            this.create(res[i]);

        }

    }.bind(site.model));

}

