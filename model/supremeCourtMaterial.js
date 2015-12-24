/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var supremeCourtMaterial = sequelize.define('supremecourtmaterial', {

        name: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE
        },
        href:{
            type: Sequelize.TEXT
        },
        description:{
            type: Sequelize.TEXT
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return supremeCourtMaterial;

};