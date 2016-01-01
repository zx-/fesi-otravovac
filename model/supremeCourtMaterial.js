/**
 * Created by z on 24.12.2015.
 */
var Sequelize = require('sequelize');
var Promise = require('bluebird');

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
        classMethods:{

            checkAndCreate: function ( values, options, newCallback ){

                return new Promise (function(resolve,reject){

                    this.findAll({
                        where: {
                            name: values.name,
                            date: values.date,
                            href: values.href
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

    return supremeCourtMaterial;

};