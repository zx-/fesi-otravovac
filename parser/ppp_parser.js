/**
 * Created by z on 18.12.2015.
 */

var request = require('request');
var cheerio = require('cheerio');
var helper = require('./helper');
var Promise = require('bluebird');

module.exports = function ( args ) {

    var base_url = args.base_url;
    var parse_url = args.parse_url;

    function absoluteUrlFromElement(elem){

        return base_url + elem.attr('href').substring(2);

    }

    function parse (doc) {

        var $ = cheerio.load(doc);
        var materials = [];

        var rows = $('.ppp-group-item');
        rows.each(function(index,element){

            var tds = $(element).find('td');

            var material = {

                name : $($(element).find('a')[0]).text(),
                date : helper.dateFromString($(tds[2]).text()),
                state : $($(tds[3]).find('img')[0]).attr('title'),
                publisher : $(tds[4]).text(),
                href : absoluteUrlFromElement( $($(element).find('a')[0]) )

            };

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

