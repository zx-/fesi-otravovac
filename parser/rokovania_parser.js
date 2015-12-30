/**
 * Created by z on 30.12.2015.
 */
/**
 * Created by z on 24.12.2015.
 */

var request = require('request');
var cheerio = require('cheerio');
var helper = require('./helper');

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

        var rows = $($('table.grid')[0]);
        rows = rows.find('tbody')[0];
        rows = $(rows).find('tr');

        rows.each(function(index,element){

            var tds = $(element).find('td');

            var material = {

                number:     $(tds[0]).text().replace(/\s/g,''),
                rokovanie:  $($(tds[1]).find('div')).text().replace(/^\s*/g,''),
                date:       helper.dateFromString($(tds[2]).text()),
                materials:  absoluteUrlFromElement($($(tds[3]).find('a')[0])),
                recordings: absoluteUrlFromElement($($(tds[4]).find('a')[0])),
                resolution: absoluteUrlFromElement($($(tds[5]).find('a')[0])),
                communique: absoluteUrlFromElement($($(tds[6]).find('a')[0]))

            };

            materials.push(material)

        });

        return materials

    }

    function run ( callback ) {

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

                    callback(mats)

                }
            }
        );
    }

    return {

        parse : run

    };

};