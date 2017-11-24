var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'}));

require('./src/config/passport')(app);


app.set('views', 'src/views');
//using ejs
app.set('view engine', 'ejs');

//navigation
var nav= [{ Link: '/Books', Text: 'Book' }, { Link: '/Authors', Text: 'Author' }, { Link: '/Admin', Text: 'Admin' }];

//defining book router
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        nav: nav,
        title: 'Hello from render'
    });
});


app.listen(port, function (err) {
    console.log('running on port ' + port);
});
