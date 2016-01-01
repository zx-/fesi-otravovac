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
    ppp: {

        parser: require('./parser/ppp_parser.js')(FESIO.portal_pravnych_predpisov),
        model: require('./model/pppMaterial.js')(sequelize)

    },
    nku: {
        parser: require('./parser/nku_parser.js')(FESIO.nku),
        model: require('./model/nkuMaterial.js')(sequelize)
    },
    rokovania: {
        parser: require('./parser/rokovania_parser.js')(FESIO.rokovania),
        model: require('./model/rokovaniaMaterial.js')(sequelize)
    },
    supreme_court: {
        parser: require('./parser/supreme_court_parser.js')(FESIO.supremeCourt),
        model: require('./model/supremeCourtMaterial.js')(sequelize)
    },
    uvo: {
        parser: require('./parser/uvo_parser.js')(FESIO.uvo),
        model: require('./model/uvoMaterial.js')(sequelize)
    }

};

function run () {

    for (var p in sites) {

        var site = sites[p];

        site.parser.parse(function (res) {

            for (var i = 0; i < res.length; i++) {

                if (this.checkAndCreate) {

                    this.checkAndCreate(res[i]).then(function (r) {
                        console.log('new instance');
                        console.log(r);
                    },
                    console.log);

                }

            }

        }.bind(site.model));

    }

}














run();