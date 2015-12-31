/**
 * Created by z on 19.12.2015.
 */

var Sequelize = require('sequelize');

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

            checkAndCreate: function ( values, options, newCallback ){

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
                                newCallback,
                                console.log
                            );

                        }

                    }.bind(this),
                    console.log
                );

            }

        },

        freezeTableName: true // Model tableName will be the same as the model name
    });

    return pppMaterial;

};