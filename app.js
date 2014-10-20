var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require your applicant Schema model
var Applicant = require('./models/applicants.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/amazon');

app.get('/', function(req, res) {
	res.render('index');
});

// When you view the applicants webpage, view a list of all the applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err, results){
		res.render('applicants', {
			applicants: results
		});
	});
});

// creates an applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database

	var formData = req.body;
	// res.redirect('success');

	// Use the submitted data to create a new Drug instance
	var prospect = new Applicant(formData);

	// Save and THEN perform this function
	prospect.save(function(err, result) {
		res.redirect('/success');
	});
});

app.get('/success', function(req, res) {
	res.render('success');
});

// Delete an applicant by ID
app.get('/delete/:id', function(req, res) {
	var applicantId = req.params.id;
	console.log(applicantId);

	Applicant.remove({_id: applicantId}, function(err, result) {
		res.redirect('/applicants');
	});
});

// Render a submitted job application


var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
