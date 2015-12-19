/**
 * Created by z on 19.12.2015.
 */

var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var Material = sequelize.define('material', {
        name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        state:{
            type: Sequelize.STRING
        },
        publisher:{
            type: Sequelize.STRING
        },
        href:{
            type: Sequelize.STRING
        },
        site: {
            type: Sequelize.INTEGER
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Material;

};