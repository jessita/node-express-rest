var express = require('express');

var bookRouter = express.Router();

var router = function (nav) {

    var books = [
        {
            "title": "The Lightning Thief",
            "author": "Rick Riordan",
            "genre": "Fantasy",
            "read": false
        }
        ,
        {
            "title": "Harry Potter and the Prisoner of Azkaban",
            "author": "J. K. Rowling",
            "genre": "Fantasy fiction",
            "read": false
        }
        ,
        {
            "title": "The Island of Adventure",
            "author": "Enid Blyton",
            "genre": "Adventure fiction",
            "read": false
        }
        ,
        {
            "title": "Eragon",
            "author": "Christopher Paolini",
            "genre": "fantasy",
            "read": false
        }
    ];

    // /books route
    bookRouter.route('/')
        .get(function (req, res) {
            res.render('bookListView', {
                nav: nav,
                books: books,
                title: 'Books'
            });
        });

    // /books/bookid route
    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                nav: nav,
                book: books[id],
                title: 'Books'
            });

        });
    return bookRouter;

}

module.exports = router;
