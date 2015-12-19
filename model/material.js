/**
 * Created by z on 19.12.2015.
 */

var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var Material = sequelize.define('material', {
        name: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE
        },
        state:{
            type: Sequelize.TEXT
        },
        publisher:{
            type: Sequelize.TEXT
        },
        href:{
            type: Sequelize.TEXT
        },
        site: {
            type: Sequelize.INTEGER
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Material;

};