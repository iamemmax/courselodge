const express = require("express");
const userSchema = require("../model/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require("multer");
const ejs = require("ejs")
const pdf = require("html-pdf")
const path = require("path");
const fs = require("fs")

exports.getRegister = (req, res) => {
  res.render("Register", {
    title: "Register Account",
  });
};

// register new user
exports.newUser = async (req, res) => {
  let error = [];
  let { username, email, password, password2 } = req.body;

  // if user leave any of the field empty
  if (!username || !email || !password || !password2) {
    error.push({ msg: "please fill all field" });
  }

  // check if password match
  if (password != password2) {
    error.push({ msg: "password not match" });
  }
  if (password.length > 0 && password.length < 5) {
    error.push({ msg: "password too weak" });
    console.log("password too weak");
  }
  // check if user enter a valid email
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  if (!validateEmail(email)) {
    error.push({ msg: "please enter a valid email" });
  }

  // check if username  is already registered
  let userNameExist = await userSchema.findOne({ username: username });
  if (userNameExist) {
    error.push({ msg: "username already Exist" });
  }
  let emailExist = await userSchema.findOne({ email: email });
  if (emailExist) {
    error.push({ msg: "email already Exist" });
  }

  // re-rendering the signup page incase of any error
  if (error.length > 0) {
    res.render("Register", {
      title: "Register Account",
      error,
    });
  } else {
    let newUser = await new userSchema({
      username,
      email,
      password,
    });
    

    await newUser.save((error, save) => {
      if (error){
        res.render("Register", {
          keyword: "register Account  signup Account",
          error,
        });
      }
      if (save) {
        // res.send(`welcome to booking ${username}`)

        console.log(save);
        res.redirect("/user/login")
        
      }
    });
  }
};

// render Login Page views\Authentication\login.ejs
exports.getLogin = (req, res) => {
  res.render("Login", {
    title: "Login to Account",
    user: req.user,
  });
};

//   validate user
exports.loginUser = async (req, res) => {
  let error = [];
  let { username, password } = req.body;

  // if user leave any of the field empty
  if (!username || !password) {
    error.push({ msg: "please fill all field" });
  }

  passport.use(
    new LocalStrategy({ usernameField: "username" }, function (
      email,
      password,
      done
    ) {
      userSchema
        .findOne({ username: username })
        .then((user) => {
          if (!user) {
            error.push({ msg: "Invalid login credentials." });

            res.render("login", {
              title: "Login to Account",
              user: req.user,
              error,
            });

            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => console.log(err));
    })
  );

  if (error.length > 0) {
    res.render("Login", {
      title: "Login to Account",
      user: req.user,
      error,
    });
  } else {
    passport.authenticate("local")(req, res, function (err) {
      if (err) {
        res.render("Login", {
          title: "Login to Account",
          user: req.user,
          error,
        });
      } else {
        res.redirect(`/`);
      }
    });
  }
};

// logout user
exports.logOut = (req, res) => {
  req.logOut();
  res.clearCookie("connect.sid", { path: "/" });
  res.redirect("/user/login");
};

exports.postUser = async (req, res) => {
  let error = [];
  let { firstname, lastname, username, email, dob, phone, address, state, country, gender, lg } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !dob ||
    !phone ||
    !state ||
    !address ||
    !gender ||
    !lg ||
    !country
  ) {
    error.push({ msg: "please filled all field" });
  }
  let myfiles = req.files;
  if (!req.files) {
    error.push({ msg: "please choose a photo" });
  }

  try {
    let newuser = await userSchema.findById(req.params.id);
    let updateUser = await userSchema.findOneAndUpdate({_id:req.params.id}, {$set: {firstname:firstname || newuser.firstname, lastname:lastname || newuser.lastname, username:username || newuser.username, email:email || newuser.email, dob:dob || newuser.dob, phone:phone || newuser.phone, address:address || newuser.address, state:state ||newuser.state, country:country || newuser.country, gender:gender || newuser.gender, lg:lg || newuser.lg,profileImg:myfiles["profileImg"][0].filename || newuser.profileImg, cv:myfiles["cv"][0].filename  || newuser.cv, signature:myfiles["signature"][0].filename || newuser.signature }})
    

    if(updateUser){
     res.redirect("/user/success")
    }
  } catch (error) {console.log(error);}
};

exports.generateReport = (req, res) =>{
  const option = {format:"A4"}
  
  res.render("Download",{user:req.user}, (err, html) =>{
    pdf.create(html, option).toFile("./docs/report.pdf", (err, data) =>{
      if(err) 
       console.log(err);
      else{
    
        let datafile = fs.readFileSync("./docs/report.pdf")
        res.header("content-type", "application/pdf")
        res.send(datafile)
      }
    })
  })


}

exports.getForm = (req, res) => {
  res.render("Account", {
    title: "User Form",
    user: req.user,
  });
};
exports.getSuccess = (req, res) => {
  res.render("Success", {
    title: "success",
    users: req.user,
  });
};
