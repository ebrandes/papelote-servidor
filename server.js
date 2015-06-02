var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var port = 3000;
var passport = require('passport');
var session = require('express-session');
// configuration =================

mongoose.connect('mongodb://localhost:27017/newdb'); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': true
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


//passport configuration
// required for passport
app.use(session({
    secret: 'ilovebrandesmotherfuckercrazymanjones'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(methodOverride());
app.use(cors());


// listen (start app with node server.js) ======================================
app.listen(port, function() {
    console.log("App rodando na porta " + port);
});

require('./routes.js')(app);