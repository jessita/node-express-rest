var http = require('http');
var xmlToJson = require('xml2js');
var parser = xmlToJson.Parser({ explicitArray: false });

var bookService = function () {

    var getBookById = function (id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/'+id+'?format=xml&key=key'
        };

        var callback = function (res) {
            var str = '';
            res.on('data', function (chunk) {
                str += chunk;
            });
            res.on('end', function(){
                console.log(str);
                parser.parseString(str, function(err, result){
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, callback).end();

    };

    return {
        getBookById: getBookById
    };
};

module.exports = bookService;