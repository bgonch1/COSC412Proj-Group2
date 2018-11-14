var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require('../models/user');
var Claim = require('../models/claim');


router.get('/',ensureAuthenticated, function(req,res){
     res.render('index');
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}else{
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}

}

var url = 'mongodb://localhost/loginapp';
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
var MongoClient = require('mongodb').MongoClient;
router.post('/users/Activity', function(req, res) {
	 var username1 =req.body.username;
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('users');
       var cursor = collection.find({username: username1});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    usernames  " + item.username + "</br>";
           }
       }, function(err) {
           res.send(str);
           db.close();
          }
       );
   });
 });
module.exports = router;
