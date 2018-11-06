var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var ActvitySchema = mongoose.Schema({

});

var Activity = module.exports = mongoose.model('Activity',ActivitySchema)