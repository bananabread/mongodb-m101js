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

app.get('/:name', function(req, res, next) {
	
	// Retrieve GET variables from req.query into local variables
	var name = req.params.name;
	var getvar1 = req.query.getvar1;
	var getvar2 = req.query.getvar2;
	res.render('Hello', { name : name, getvar1 : getvar1, getvar2 : getvar2 });

});

app.listen(3000);
console.log('Express server started on port 3000');