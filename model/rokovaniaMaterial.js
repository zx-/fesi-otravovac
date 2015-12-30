/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var rokovaniaMaterial = sequelize.define('rokovaniamaterial', {
        number:{
            type: Sequelize.TEXT
        },
        rokovanie: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE
        },
        materials:{
            type: Sequelize.TEXT
        },
        recordings:{
            type: Sequelize.TEXT
        },
        resolution:{
            type: Sequelize.TEXT
        },
        communique:{
            type: Sequelize.TEXT
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return rokovaniaMaterial;

};