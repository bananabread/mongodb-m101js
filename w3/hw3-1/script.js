var MongoClient = require('mongodb').MongoClient;

// Connect to localhost
MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	
	if(err) throw err;

	var query = { };

	// Query the database and sort by state then temp
	var cursor = db.collection('students').find(query);

	// Loop over each row
	cursor.each(function(err, doc) {

		if(err) throw err;

		if(doc === null) {

			return db.close();

		} else {

			// Drop the lowest score from scores array
			doc.scores = dropLowest(doc.scores);

			// Update the current row with the amended scores array
			db.collection('students').update(query, doc, {}, function(err, res) {

				if(err) throw err;

			});

		}

	});

});

function dropLowest(scores) {

	var lowest_value = 200;
	var lowest_index = -1;
	var updated_scores = [];

	// Loop over the scores to find lowest
	for (i=0; i<scores.length; i++) {

		// Pull out 'score' and 'type'
		var value = scores[i]['score'];
		var type = scores[i]['type'];
		
		// Check is type 'homework' score lower than previous 
		if (value < lowest_value && type === 'homework') {
		
			lowest_value = value;
			lowest_index = i;
		
		}
	
	}

	// Loop over scores and remove lowest
	for (i = 0; i < scores.length; i++) {

		if (i !== lowest_index) updated_scores.push(scores[i]);
	
	}

	return updated_scores;

}