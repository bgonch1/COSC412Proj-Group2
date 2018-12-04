var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require('../models/user');
var Claim = require('../models/claim');
var Admin = require('../models/Admin');


router.get('/',ensureAuthenticated, function(req,res){
     res.render('index');
});


router.get('/.',ensureAuthenticated1, function(req,res){
     res.render('adminindex');
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}else{
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}

}

function ensureAuthenticated1(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}else{
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/Admin');
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
       			res.send(db);
       });
   });
});
router.post('/users/ReviewClaims', function(req,res){
	MongoClient.connect(url,function(err,db){
		var collection = db.collection('claims');
		collection.find().toArray(function(err,db){
			var str = db
			res.send(str);


		});

	});
});
module.exports = router;
