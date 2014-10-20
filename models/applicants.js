var mongoose = require('mongoose');

// Define a schema for the documents inside this collection
var applicantSchema = mongoose.Schema({
	name: String,
	bio: String,
	skills: String,
	yearsofexperience: Number,
	whywork: String
});

module.exports = mongoose.model('applicant', applicantSchema);