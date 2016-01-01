/**
 * Created by z on 30.12.2015.
 */

var request = require('request');
var cheerio = require('cheerio');
var helper = require('./helper');
var Promise = require('bluebird');

module.exports = function ( args ) {

    var base_url = args.base_url;
    var parse_url = args.parse_url;
    var parse_types = args.parse_types;

    function absoluteUrlFromElement(elem){

        return base_url + elem.attr('href');

    }



    function parse (doc) {

        var $ = cheerio.load(doc);
        var materials = [];

        for(var i = 0; i < parse_types.length; i++){

            var type = parse_types[i];

            var container = $('#druh_'+type).parent().parent();

            var headings = container.find('h4');

            headings.each(function(i,e){

                e = $(e);
                var sub_type = e.text();
                var ul = e.next();

                var items = ul.find('li');


                items.each(function(index,item){

                    item = $(item);

                    var material = {

                        name: item.find('a').text(),
                        date: new Date(),
                        href: item.find('a').attr('href'),
                        type: type,
                        subtype: sub_type

                    };

                    item.find('a').remove();
                    material.description = item.text();

                    materials.push(material)

                });

            });


        }



        return materials

    }

    function run () {

        return new Promise(function (resolve,reject) {

            request.get({
                    url: parse_url,
                    headers: {
                        'User-Agent': 'curl/7.31.0',
                        'accept' : '*/*'
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var mats = parse( body );

                        resolve(mats)

                    } else {

                        reject(error);

                    }
                }
            );

        });

    }

    return {

        parse : run

    };

};
