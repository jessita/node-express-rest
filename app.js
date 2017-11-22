var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', 'src/views');

//using ejs
app.set('view engine', 'ejs');

//navigation
var nav= [{ Link: '/Books', Text: 'Book' }, { Link: '/Authors', Text: 'Author' }, { Link: '/Admin', Text: 'Admin' }]

//defining book router
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', {
        nav: nav,
        title: 'Hello from render'
    });
});


app.listen(port, function (err) {
    console.log('running on port ' + port);
});
