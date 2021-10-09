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