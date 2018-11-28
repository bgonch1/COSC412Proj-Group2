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
	 var name1 =req.body.name;
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('claims');
       collection.find({first_name:name1}).toArray(function(err,db){
       	res.send(db).pretty();
       });
   });
});
router.post('/users/reviewClaims', function(req,res){
	MongoClient.connect(url,function(err,db){
		var collection = db.collection('claims');
		collection.find().toArray(function(err,db){
			res.send(db);
		});
	});
});
module.exports = router;
