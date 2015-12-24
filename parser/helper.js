/**
 * Created by z on 24.12.2015.
 */
module.exports.dateFromString = function (date) {

    date = date.replace(/\s+/g, '');
    var dateParts = date.split(".");
    return new Date(dateParts[2], (dateParts[1]-1), (dateParts[0]));

};