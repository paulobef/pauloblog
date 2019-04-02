// Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// Database connection
mongoose.connect("mongodb://localhost:27017/node-blog")

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// templating engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.get("/", (req, res) => {
   res.render('index.ejs');
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})