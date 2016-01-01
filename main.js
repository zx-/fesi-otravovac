/**
 * Created by z on 18.12.2015.
 */

var Promise = require('bluebird');

    // CONFIGS
var FESIO = require('./configuration.js');
var DB_CFG = require('./db_config.js');


// MODEL
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_CFG.conString,{ logging: false });

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

    var parsingStartedPromises = {};

    for (var k in sites) {

        var site = sites[k];

        var p = site.parser.parse().then(function (res) {

                var returnPromises = [];

                for (var i = 0; i < res.length; i++) {

                    if (this.checkAndCreate) {

                        returnPromises.push(this.checkAndCreate(res[i]).reflect());

                    }

                }

                return returnPromises;

            }.bind(site.model),
            console.log

        ).reflect();

        parsingStartedPromises[k] = p;

    }

    return new Promise(function (resolve, reject) {

        Promise.props(parsingStartedPromises).then(
            function (sitePromises) {

                var siteMaterialPromises = {};

                for (var key in sitePromises) {

                    if (sitePromises[key].isFulfilled()) {

                        siteMaterialPromises[key] = Promise.all(sitePromises[key].value());

                    }

                }

                return Promise.props(siteMaterialPromises);

            },
            function (error) {

                console.error("All sites materials promise rejected");
                console.error(error);

            }
        ).then(
            function (siteMaterial) {

                var newItems = {};

                for( var siteName in siteMaterial ) {

                    var materialsPromises = siteMaterial[siteName];

                    newItems[siteName] = [];

                    for ( var i = 0; i < materialsPromises.length; i++ ) {

                        if ( materialsPromises[i].isFulfilled() ) {

                            newItems[siteName].push( materialsPromises[i].value() );

                        }

                    }

                }

                resolve(newItems);

            },
            reject
        );

    });

}

module.exports = run;
