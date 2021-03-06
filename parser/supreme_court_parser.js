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

    function absoluteUrlFromElement(elem){

        if( elem.attr('href') === undefined ) return null;
        return base_url + elem.attr('href');

    }

    function parse (doc) {

        var $ = cheerio.load(doc);
        var materials = [];

        var rows = $('.news-list');

        rows.each(function(index,element){

            var material = {

                name:   $($(element).find('h2')).text(),
                href:   absoluteUrlFromElement($($($(element).find('h2')).find('a')[0])),
                date:   helper.dateFromString($($(element).find('.datum')[0]).text().replace(/-/g,'')),

            };

            var popis = $($(element).find('.popis'));
            popis.find('.datum').remove();
            material.description = popis.text();

            materials.push(material)

        });

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