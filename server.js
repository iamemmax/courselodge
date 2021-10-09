const express = require("express")
const path = require("path")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const userRouter = require("./routes/UserRoute")
const methodOverride = require("method-override")


const app = express()


// middle wares
app.use(cors())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

app.use(session({
    secret:"emmalex",
    cookie:{maxAge: 600000000000000},
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());



require("./config/passport")(passport)

    


// Homepage routes
app.get("/", async (req, res) =>{

   
    
    res.render("index",{
        user:req.user
    })
})
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
        res.redirect("/")
        
      }
    });
  }
};

// connect to databse
mongoose.connect(process.env.db_connect, {
    useNewUrlParser: true, useUnifiedTopology: true 
}, (err, connet)=>{
    if(err) console.log(err);
    else console.log("database connected successfully")
})

// Routes
app.use("/user", userRouter);


// listen to Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server started on http://localhost:${PORT}`);
})