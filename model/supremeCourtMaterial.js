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
        classMethods:{

            checkAndCreate: function ( values, options, newCallback ){

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

    return supremeCourtMaterial;

};