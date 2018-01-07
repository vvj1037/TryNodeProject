var express = require('express')
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb");
mongoose.Promise = global.Promise;

var mainController = require('./controllers/main')

var app = express();

app.set('view engine','ejs');

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));
mainController(app);

app.listen(3000);

console.log("Listener started!")

