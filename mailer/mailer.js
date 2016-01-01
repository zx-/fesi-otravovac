/**
 * Created by z on 1.1.2016.
 */

var nodemailer = require('nodemailer');
var HTMLing = require('htmling');

module.exports = function ( cfg ) {

    var transporter = nodemailer.createTransport(cfg.conString);

    var mailOpts = {

        from: cfg.from,
        to: cfg.to,
        site: cfg.site

    };

    var newMailTemplate = HTMLing.file(__dirname+'/newmaterial.html');

    function sendNewMails( materials ) {

        sendMails(
            materials,
            '[Fesi-otravovac] New materials found',
            'Fesi otravovac has found new materials'
        );

    }

    function sendDaily( buffer ) {

        sendMails(
            buffer,
            '[Fesi-otravovac] Daily report',
            'This email contains new materials from previous day'
        );

    }

    function sendMails ( materials, subject, message ) {

        materials.site = mailOpts.site;
        materials.message = message;

        for(var i = 0; i < mailOpts.to.length; i++){

            var opts = {

                from: mailOpts.from,
                to: mailOpts.to[i],
                subject: subject,
                text: 'Salam',
                html: newMailTemplate.render(materials)

            };

            transporter.sendMail(opts,function(err, info){

                if(err){

                    return console.log(err);

                }

                console.log(info.response);

            });


        }

    }

    return {

        sendNewMaterials: sendNewMails,
        sendDaily: sendDaily

    }

};