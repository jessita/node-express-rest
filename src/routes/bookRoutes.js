var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bookRouter = express.Router();

var router = function (nav) {

    bookRouter.use(function(req,res,next){
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
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
            var id = new ObjectId(req.params.id);

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

};

module.exports = router;
