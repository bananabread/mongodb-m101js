var MongoClient = require('mongodb').MongoClient;

// Connect to localhost
MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	
	if(err) throw err;

	var query = { };

	// Query the database and sort by state then temp
	var cursor = db.collection('data').find(query, { 'State' : 1, 'Temperature' : 1 } );

	cursor.sort( [ [ 'State',1 ], [ 'Temperature', -1 ] ] );

	// Initialize variable to hold state
	var state = '';

	cursor.each(function(err, doc) {

		if(err) throw err;

		if(doc == null || doc.State == null) {

			return db.close();

		} else if(doc.State !== state) {
		// If the current row's state is not equal to the existing variable (i.e. is the highest temp value for that state)

			// Set state to current row's state
			state = doc.State;

			// Add the month_high column
			db.collection('data').update( { '_id' : doc._id }, { '$set' : { 'month_high' : true } }, function(err, updated) {

				if(err) throw err;

			});

		}

	});

});