const express = require("express")
const mongoose = require("mongoose")
const LocalStrategy = require("passport-local").Strategy
const userSchema = require("../model/User")
const passport = require("passport")
const  GoogleStrategy = require("passport-google-oauth20").Strategy
const  FacebookStrategy = require("passport-facebook").Strategy



module.exports =  passportAuth = ( passport, res) =>{

   

    
passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
userSchema.findById(id, (err, user) =>{
done(err, user);

})

});






    // facebook authentication
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.facebook_Secrete,
        callbackURL: process.env.Facebook_callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email', 'name',],
        enableProof: true
      },
      function(accessToken, refreshToken, profile, cb) {
          console.log(profile);
        User.findOrCreate({ facebookId: profile.id, username:profile.displayName, email:profile.emails[0].value, password:profile.displayName}, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    


     
    
    
    // google authentication
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.callbackURL,

      },
      function(accessToken, refreshToken, profile, cb) {
        userSchema.findOrCreate({ googleId:profile.id, username:profile.displayName, email:profile.emails[0].value, password:profile.emails[0].value }, function (err, user) {
            console.log(profile);
           
          return cb(err, user);
        });
      }
    ));

}


