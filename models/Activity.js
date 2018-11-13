var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var ActvitySchema = mongoose.Schema({
  username:{
		type: String,
		index:true
	},
});

var Activity = module.exports = mongoose.model('Activity',ActivitySchema)
