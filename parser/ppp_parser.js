/**
 * Created by z on 18.12.2015.
 */

var request = require('request');
var cheerio = require('cheerio');

module.exports = function ( args ) {

    var base_url = args.base_url;
    var parse_url = args.parse_url;

    function absoluteUrlFromElement(elem){

        return base_url + elem.attr('href').substring(2);

    }

    function dateFromString(date){

        date = date.replace(/\s+/g, '');
        var dateParts = date.split(".");
        return new Date(dateParts[2], (dateParts[1]-1), (dateParts[0]));

    }

    function parse (doc) {

        var $ = cheerio.load(doc);
        var materials = [];

        var rows = $('.ppp-group-item');
        rows.each(function(index,element){

            var tds = $(element).find('td');

            var material = {

                name : $($(element).find('a')[0]).text(),
                date : dateFromString($(tds[2]).text()),
                state : $($(tds[3]).find('img')[0]).attr('title'),
                publisher : $(tds[4]).text(),
                href : absoluteUrlFromElement( $($(element).find('a')[0]) )

            };

            materials.push(material)

        });

        return materials

    }

    function run ( callback ) {

        request(parse_url, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var mats = parse( body );

                callback(mats)

            }
        });

    }

    return {

        parse : run

    };

};

