const express = require("express")
const userSchema = require("../model/User")
// import routes from controller
const passport = require("passport")
const {getRegister, newUser, getLogin, loginUser, logOut} = require("../controller/User")
const userRouter = express.Router()


// register routes
userRouter.get("/register", getRegister)
userRouter.post("/register", newUser)


//  login routes
userRouter.get("/login", getLogin)
userRouter.post("/login", loginUser)

// logout routes
userRouter.get("/logout", logOut)



// google authentication
userRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    
    res.redirect('/');

  });


  
// //   facebook authenticate


userRouter.get('/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));

userRouter.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/user/login' }),
  function(req, res) {
 
    res.redirect('/');
  });
module.exports =  userRouter;