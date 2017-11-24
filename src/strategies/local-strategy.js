var passport = require('passport');
var LocalStrategy = require('passport-strategy').Strategy;

module.exports = function () {'local',
    passport.use(new LocalStrategy({
        userNameField: 'userName',
        passwordField: 'password'
    },
        function (username, password, done) {

            var user = {
                username: username,
                password: password
            };
            done(null,user);
        })
    );
};