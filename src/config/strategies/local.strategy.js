var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {

    passport.use(new LocalStrategy(
        function (username, password, cb) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');

                collection.findOne({ username: username }, function (err, results) {
                    if (results.password === password) {
                        var user = results;
                        cb(null, user);
                    } else {
                        cb(null, false, {message:'Bad password'});
                    }

                });
            });
        }));
};