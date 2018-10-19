var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Claim = require('../models/claim');


router.get('/register',function(req,res){
     res.render('register');
});
router.get('/login',function(req,res){
     res.render('login');
});
router.get('/claims',function(req,res){
     res.render('claims');
});

router.post('/register',function(req,res){
     var name = req.body.name;
     var email =req.body.email;
     var username =req.body.username;
     var password =req.body.password;
     var password2 =req.body.password2;

     //Validation
     req.checkBody('name','Name is required').notEmpty();
     req.checkBody('email','Email is required').notEmpty();
     req.checkBody('email','Email is not valid').isEmail();
     req.checkBody('username','username is required').notEmpty();
     req.checkBody('password','Password is required').notEmpty();
     req.checkBody('password2','Passwords do not match').equals(req.body.password);



     var errors = req.validationErrors();
     if(errors){
     	res.render('register',{
     		errors:errors 
     	});
     	
     }else {
     	var newUser = new User({
     		name: name,
     		email: email,
     		username: username,
     		password: password
     	});

     	User.createUser(newUser, function(err,user){
     		if(err)throw err;
     		console.log(user);
     	});

     	req.flash('success_msg', 'You are registered and can now login');

     	res.redirect('/users/login');

     }
});

router.post('/claims',function(req,res){
     var first_name = req.body.first_name;
     var middle_initial = req.body.middle_initial;
     var last_name = req.body.last_name;
     var SSN =req.body.SSN;
     var speak_language =req.body.speak_language;
     var write_language = req.body.write_language;
     var DOB = req.body.DOB;
     var City = req.body.City;
     var State = req.body.State;
     var admission_to_US = req.body.admission_to_US;
     var Name_at_Birth = req.body.Name_at_Birth;
     var Other_Name = req.body.Other_Name;
     var Other_SSN = req.body.Other_SSN;
     var severity_date = req.body.severity_date;
     var person_SSN = req.body.person_SSN;

     //Validation
     req.checkBody('first_name','First Name is required').notEmpty();
     req.checkBody('middle_initial','Middle Initial is required').notEmpty();
     req.checkBody('last_name','Last Name is required').notEmpty();
     req.checkBody('SSN','Social Secuirty Number is required').notEmpty();
     req.checkBody('speak_language','The language you speak is required').notEmpty();
     req.checkBody('DOB','Date of Birth is required').notEmpty();
     req.checkBody('write_language','The language you write in is required').notEmpty();
     req.checkBody('City','City you live in is required').notEmpty();
     req.checkBody('State','State you live in is required').notEmpty();
     req.checkBody('admission_to_US','When you were lawfully admitted to the US is required').notEmpty();
     req.checkBody('Name_at_Birth','Name at Birth is required').notEmpty();
     req.checkBody('Other_Name','Other name is required').notEmpty();
     req.checkBody('Other_SSN','Other Social Security number is required').notEmpty();
     req.checkBody('severity_date','The date your condition became severe is required').notEmpty();
     req.checkBody('person_SSN','The person who filled out your Social Security record is required').notEmpty();




     var errors = req.validationErrors();
     if(errors){
      res.render('claims',{
        errors:errors 
      });
      
     }else {
      var newClaim = new Claim({
        first_name: first_name,
        middle_initial: middle_initial,
        SSN: SSN,
        speak_language: speak_language,
        write_language: write_language,
        DOB : DOB,
        City:City,
        State: State,
        admission_to_US : admission_to_US,
        Name_at_Birth : Name_at_Birth,
        Other_Name : Other_Name,
        Other_SSN : Other_SSN,
        severity_date : severity_date,
      });

      Claim.createClaim(newClaim, function(err,claim){
        if(err)throw err;
        console.log(claim);
      });


      req.flash('success_msg', 'Your claim has filled');

      res.redirect('/users/login');

     }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.getUserByUsername(username,function(err,user){
  		if(err) throw err;
  		if(!user){
  			return done(null,false,{message: 'Unknown User'});
  		}

  		User.comparePassword(password,user.password,function(err, isMatch){
  			if(err) throw err;
  			if(isMatch){
  				return done(null,user);
  			}else{
  				return done(null,false,{message:'Invalid password'});
  			}
  		});
  	});
  
  }));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{successRedirect:'/',failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
  	res.redirect('/');
 
  });

router.get('/logout',function(req,res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');

});
module.exports = router;
