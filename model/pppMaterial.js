/**
 * Created by z on 19.12.2015.
 */
var Sequelize = require('sequelize');
var Promise = require('bluebird');

module.exports = function ( sequelize ) {

    var pppMaterial = sequelize.define('pppmaterial', {
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
        }

    }, {
        classMethods:{

            checkAndCreate: function ( values, options ){

                return new Promise (function(resolve,reject){

                    this.findAll({
                        where: {
                            name: values.name,
                            date: values.date,
                            publisher: values.publisher,
                            state: values.state
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

    return pppMaterial;

};