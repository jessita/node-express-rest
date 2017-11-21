var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', 'src/views');

//using Jade
//app.set('view engine', 'Jade');

//using express-handlebars
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('index', {
        list: ['a', 'b'],
        title: "Hello from render"
    });
});

app.get('/books', function (req, res) {
    res.send('Hello books');
});

app.listen(port, function (err) {
    console.log('running on port ' + port);
});
