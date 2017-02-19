'use strict';

var fs = require('fs'),
    result;


module.exports = function (dirname, ext, callback) {
    var extension = "." + ext;
    fs.readdir(dirname, function (err, list) {
        if (err) {
            callback(err, null);
        }
        else {
            result = [];
            list.map(function (elem) {
                if (elem.split('.')[1] === ext) {
                    result.push(elem);
                }
            });
            callback(null, result);
        }
    });

};