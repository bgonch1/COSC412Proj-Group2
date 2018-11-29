var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var AdminSchema = mongoose.Schema({
	adminusername:{
		type: String,
		index:true
	},
	adminpassword: {
		type:String
	},
	adminemail: {
		type:String
	},
	adminname: {
		type:String
	}


});

var Admin = module.exports = mongoose.model('Admin',UserSchema);

module.exports.createAdmin = function(newUser,callback){
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newAdmin.adminpassword,salt,function(err,hash){
			newAdmin.adminpassword = hash;
			newAdmin.save(callback);
  
		});
	});
}

module.exports.getAdminByUsername = function(username,callback){
	var query = {adminusername: adminusername};
	Admin.findOne(query, callback);
}
module.exports.getAdminById = function(id,callback){
	Admin.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err)throw err;
		callback(null,isMatch);
	});
}