var express = require('express');
var bookRouter = express.Router();


var router = function (nav) {
    var bookService = require('../services/bookService')();
    var bookController = require('../controllers/bookController')(bookService, nav);
    bookRouter.use(bookController.middleware);
    // /books route
    bookRouter.route('/')
        .get(bookController.getIndex);

    // /books/bookid route
    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;

};

module.exports = router;
