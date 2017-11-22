var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', 'src/views');

//using ejs
app.set('view engine', 'ejs');

//navigation
var nav= [{ Link: '/Books', Text: 'Book' }, { Link: '/Authors', Text: 'Author' }]

//defining book router
var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        nav: [{ Link: '/Books', Text: 'Books' }, { Link: '/Authors', Text: 'Authors' }],
        title: 'Hello from render'
    });
});


app.listen(port, function (err) {
    console.log('running on port ' + port);
});
