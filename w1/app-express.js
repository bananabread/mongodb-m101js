var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

// Set the template and rendering engine
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

// Initialise the mongoclient object
var mongoclient = new MongoClient(new Server('localhost', 27017,
												{ 'native_parser' : true }));

// Set the database to be used
var db = mongoclient.db('test');

app.get('/', function(req, res) {
	
	db.collection('hello_mongo_express').findOne({}, function(err, doc) {

		res.render('Hello', doc);

	});

});

// all unhandled routes
app.get('*', function(req, res) {
	
	res.send("Page not found", 404);

});

// Start the mongo client with callback function 
mongoclient.open(function(err, mongoclient) {

	if(err) throw err;

	// If a connection can be made then start the listener
	app.listen(8080);
	console.dir("Express server started on port 8080");

});