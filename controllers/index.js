// Require your applicant Schema model
var Applicant = require('../models/applicants.js');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	// Route to view all the submitted applicants' form data
	applicants: function(req, res) {
		// Find all applicants store in results, THEN render all applicants
		Applicant.find({}, function(err, results){
			res.render('applicants', {
				applicants: results
			});
		});
	},
	// Form submission route
		// This creates an applicant using the data entered into your form
	applicant: function(req, res) {
		// Here is where you need to get the data
		// from the post body and store it in the database

		var formData = req.body;

		// Use the submitted data to create a new applicant instance
		var prospect = new Applicant(formData);

		// Save and THEN redirect
		prospect.save(function(err, result) {
			res.redirect('/success');
		});
	},
	success: function(req, res) {
		res.render('success');
	},
	// Delete an applicant by ID
	deleteIt: function(req, res) {
		var applicantId = req.params.id;
		console.log(applicantId);

		Applicant.remove({_id: applicantId}, function(err, result) {
			res.redirect('/applicants');
		});
	},
	// Render an applicant's submitted application, using their ID as the page route
	getId: function(req, res) {
		var applicantId = req.params.id;
		// res.send(applicantId);

		Applicant.find({_id: applicantId}, function(err, results){
			// res.send("Found");
			res.render('submittedapp', {
				applicants: results
			});
		});
	}
};

module.exports = indexController;