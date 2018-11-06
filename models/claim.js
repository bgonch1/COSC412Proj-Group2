var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var ClaimSchema = mongoose.Schema({
	first_name:{
		type: String,
		index:true
	},
	middle_initial: {
		type:String
	},
	last_name: {
		type:String
	},
	SSN: {
		type:String
	},
	speak_language: {
		type:String
	},
	write_language:{
		type:String
	},
	DOB:{
		type:String
	},
	City:{
		type:String
	},
	State:{
		type:String
	},
	admission_to_US:{
		type:String
	},
	Name_At_Birth:{
		type:String
	},
	Other_Name:{
		type:String
	},
	Other_SSN:{
		type:String
	},
	severity_date:{
		type:String
	},
	person_SSN:{
		type:String
	},
	Gender:{
		type:String
	},
	publicRecord:{
		type:String
	},
	religiousRecord:{
		type:String
	},
	usCitizen:{
		type:String
	},
	Alien:{
		type:String
	},
	otherNames :{
		type:String
	},
	otherSSN :{
		type:String
	},
	personSSN:{
		type:String
	},
	updated:{
		type: Date, default: Date.now
	}



});

var Claim = module.exports = mongoose.model('Claim',ClaimSchema);

module.exports.createClaim = function(newClaim,callback){
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newClaim.SSN,salt,function(err,hash){
			newClaim.SSN = hash;
			newClaim.save(callback);
  
		});
	});
}
/*
module.exports.getUserByUsername = function(username,callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.getUserById = function(id,callback){
	User.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err)throw err;
		callback(null,isMatch);
	});
}*/
