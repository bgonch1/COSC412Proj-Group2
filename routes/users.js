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
     //var validPass = /^[A-Za-z]\w{7,15}$/;


     //Validation
     req.checkBody('name','Name is required').notEmpty();
     req.checkBody('email','Email is required').notEmpty();
     req.checkBody('email','Email is not valid').isEmail();
     req.checkBody('username','username is required').notEmpty();
     req.checkBody('password','Password is required that is atleast 8 characters, 1 number, 1 uppercase letter and 1 lowercase letter').notEmpty().isLength({ min: 4}).matches('[0-9]').matches('[a-z]').matches('[A-Z]');
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
     var Gender = req.body.Gender;
     var gender_value;
     if(Gender =='Male'){
        gender_value = req.body.g1;

     }else if(Gender =='Female'){
        gender_value = req.body.g2;

     } 
     var publicRecord = req.body.publicRecord;
     var publicRecord_value;
     if(publicRecord == 'Yes'){
      publicRecord_value = req.body.pr1;
     }else if(publicRecord == 'No'){
      publicRecord_value = req.body.pr2;
     }else if(publicRecord == 'Unknown'){
      publicRecord_value == req.body.pr3;
     }
     var religiousRecord = req.body.religiousRecord;
     var religiousRecord_value;
     if(religiousRecord == 'Yes'){
      religiousRecord_value = req.body.pr1;
     }else if(religiousRecord == 'No'){
      religiousRecord_value = req.body.pr2;
     }else if(religiousRecord == 'Unknown'){
      religiousRecord_value == req.body.pr3;
     }
     var usCitizen = req.body.usCitizen;
     var usCitizen_value;
     if(usCitizen =='Yes'){
        usCitizen_value = req.body.g1;

     }else if(usCitizen =='No'){
        usCitizen_value = req.body.g2;

     } 
     var Alien = req.body.Alien;
     var Alien_value;
     if(Alien =='Yes'){
        Alien_value = req.body.g1;

     }else if(Alien =='No'){
        Alien_value = req.body.g2;

     }
     var otherNames = req.body.otherNames;
     var otherNames_value;
     if(otherNames =='Yes'){
        otherNames_value = req.body.g1;

     }else if(otherNames =='No'){
        otherNames_value = req.body.g2;

     }
     var otherSSN = req.body.otherSSN;
     var otherSSN_value;
     if(otherSSN =='Yes'){
        otherSSN_value = req.body.g1;

     }else if(otherSSN =='No'){
        otherSSN_value = req.body.g2;

     }
     var personSSN = req.body.personSSN;
     var personSSN_value;
     if(personSSN =='Yes'){
        personSSN_value = req.body.g1;

     }else if(personSSN =='No'){
        personSSN_value = req.body.g2;

     }     


