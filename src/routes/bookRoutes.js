var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookRouter = express.Router();

var router = function (nav) {

    // /books route
    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, result) {
                        res.render('bookListView', {
                            nav: nav,
                            books: result,
                            title: 'Books'
                        });
                    });

            });

        });

    // /books/bookid route
    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.findOne({ _id: id },
                    function (err, result) {
                        res.render('bookView', {
                            nav: nav,
                            book: result,
                            title: 'Books'
                        });
                    });
            });

        });
    return bookRouter;

}

module.exports = router;
