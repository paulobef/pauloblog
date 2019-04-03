// Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// Database connection
mongoose.connect("mongodb://localhost:27017/pauloblog")


// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// templating engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Mongoose Schema
var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model('Post', postSchema);


// Routes
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index.ejs', { posts: posts})
    })
});
// add post route for saving the request body and redirecting to the root route
app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})