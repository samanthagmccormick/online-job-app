var express = require('express');
var bodyParser = require('body-parser');

	// Require mongoose
	var mongoose = require('mongoose');

	// Require the controller
	var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

	// Connect to your company's database, amazon
	mongoose.connect('mongodb://localhost/amazon');

app.get('/', indexController.index);

// When you view the applicants webpage, view a list of all the applicants
app.get('/applicants', indexController.applicants);

// form route - this creates an applicant using the data entered into your form
app.post('/applicant', indexController.applicant);

// show success page after form submission
app.get('/success', indexController.success);

// delete an applicant by ID
app.get('/delete/:id', indexController.deleteIt);

// render an applicant's submitted application, using their ID as the page route
app.get('/:id', indexController.getId);

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
