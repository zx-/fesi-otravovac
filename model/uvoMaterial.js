/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');
var Promise = require('bluebird');

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
        classMethods:{

            checkAndCreate: function ( values, options ){

                return new Promise (function(resolve,reject){

                    this.findAll({
                        where: {
                            name: values.name,
                            description: values.description,
                            subtype: values.subtype,
                            type: values.type
                        }
                    }).then(
                        function ( res ) {

                            if( res.length == 0 ){

                                this.create(values, options).then(
                                    resolve,
                                    reject
                                );

                            } else {

                                reject("Already exists");

                            }

                        }.bind(this),
                        reject
                    );

                }.bind(this));

            }

        },

        freezeTableName: true // Model tableName will be the same as the model name
    });

    return uvoMaterial;

};