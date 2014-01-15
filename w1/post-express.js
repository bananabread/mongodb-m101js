var express = require('express'),
	app = express(),
	cons = require('consolidate');

app.engine('html', cons.swing);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(app.router);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {

	res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'pear', 'banana', 'peach' ] });

});

app.post('/favourite_fruit', function(req, res, next) {

	var favourite = req.body.fruit;
	if(typeof favourite == 'undefined') {
		next(Error('Please choose a fruit'));
	} else {
		res.send('Your favourite fruit is ' + favourite);
	}

});

app.listen(3000);
console.log('Express server started on port 3000');