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



}


