var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/w1', function(err, db) {
	
	if(err) throw err;

	// Find one document in the collection
	db.collection('coll').findOne({}, function(err, doc) {

		if(err) throw err;

		// Print the result
		console.dir(doc);

		// Close db connection
		db.close();

	});

	// Declare success
	console.dir("Called findOne!");

});