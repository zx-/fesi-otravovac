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
        classMethods:{

            checkAndCreate: function ( values, options, newCallback ){

                this.findAll({
                    where: {
                        number: values.number,
                        date: values.date
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

    return rokovaniaMaterial;

};