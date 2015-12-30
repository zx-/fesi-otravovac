/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');

module.exports = function ( sequelize ) {

    var uvoMaterial = sequelize.define('uvomaterial', {
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
        },
        type:{
            type: Sequelize.INTEGER
        },
        subtype:{
            type: Sequelize.TEXT
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return uvoMaterial;

};