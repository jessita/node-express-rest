var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

//revealing module pattern

var middleware = function (req, res, next) {
    // if (!req.user) {
    //     res.redirect('/');
    // }
    next();
};

var bookController = function (bookService, nav) {
    var getIndex = function (req, res) {
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

    };

    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);

        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');

            collection.findOne({ _id: id },
                function (err, result) {
                    if (result.bookId) {

                        bookService.getBookById(result.bookId, function (err, book) {
                            result.book = book;
                            res.render('bookView', {
                                nav: nav,
                                book: result,
                                title: 'Books'
                            });
                        });

                    } else {
                        res.render('bookView', {
                            nav: nav,
                            book: result,
                            title: 'Books'
                        });
                    }

                });
        });

    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;