/**
 * Created by z on 19.12.2015.
 */

var DB_CFG = require('./db_config.js');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_CFG.conString);

var mats = [];
mats.push(require('./model/pppMaterial')(sequelize));
mats.push(require('./model/nkuMaterial')(sequelize));
mats.push(require('./model/rokovaniaMaterial')(sequelize));
mats.push(require('./model/uvoMaterial')(sequelize));
mats.push(require('./model/supremeCourtMaterial')(sequelize));

mats.forEach(function(el){

    el.sync({force: true}).then(function () {

        console.log('created',el);

    }, function(e){

        console.log(e);

    });

});

