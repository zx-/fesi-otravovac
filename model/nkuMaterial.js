/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var nkuMaterial = sequelize.define('nkumaterial', {
        name: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE
        },
        publisher:{
            type: Sequelize.TEXT
        },
        href:{
            type: Sequelize.TEXT
        },
        publisherhref:{
            type: Sequelize.TEXT
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return nkuMaterial;

};