var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();

var books = [
    {
        'title': 'The Lightning Thief',
        'author': 'Rick Riordan',
        'genre': 'Fantasy',
        'read': false,
        'bookId': 28187
    },
    {
        'title': 'Harry Potter and the Prisoner of Azkaban',
        'author': 'J. K. Rowling',
        'genre': 'Fantasy fiction',
        'read': false,
        'bookId': 5
    },
    {
        'title': 'The Island of Adventure',
        'author': 'Enid Blyton',
        'genre': 'Adventure fiction',
        'read': false,
        'bookId': 17492
    },
    {
        'title': 'Eragon',
        'author': 'Christopher Paolini',
        'genre': 'fantasy',
        'read': false,
        'bookId': 113436
    }
];

var router = function (nav) {

    adminRouter.route('/')
        .get(function (req, res) {
            res.send('Page work in progress');
        });

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;

};

module.exports = router;
