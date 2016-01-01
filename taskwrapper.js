/**
 * Created by z on 1.1.2016.
 */

var main = require('./main.js');
var mailcfg = require('./mail_config');
var mailer = require('./mailer/mailer.js')(mailcfg);

var buffer = {};

function addToBuffer(mats){

    for(var siteName in mats) {

        if( buffer[siteName] === undefined ) {

            buffer[siteName] = [];

        }

        buffer[siteName] = buffer[siteName].concat(mats[siteName]);

    }

}

function checkSites () {

    main.checkSites().then(function(newMaterials){

        addToBuffer(newMaterials);

        for(var site in newMaterials) {

            if( newMaterials[site].length > 0 ) {

                mailer.sendNewMaterials(newMaterials);
                return;

            }

        }

    });

}

function sendDaily(){

    mailer.sendDaily(buffer);

}

function clearBuffer(){

    buffer = {};

}

module.exports = {

    checkSites: checkSites,
    sendDaily: sendDaily,
    clearBuffer: clearBuffer

};