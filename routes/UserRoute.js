const express = require("express")
const userSchema = require("../model/User")
// import routes from controller
const passport = require("passport")
const auth = require("../config/auth")
const upload = require("../config/upload")
const {getRegister, newUser, getLogin, loginUser, logOut, getForm, postUser,generateReport, getSuccess} = require("../controller/User")
const userRouter = express.Router()


// register routes
userRouter.get("/register", getRegister)
userRouter.post("/register", newUser)


//  login routes
userRouter.get("/login",   getLogin)
userRouter.post("/login", loginUser)

userRouter.get("/logout", logOut)
// logout routes
userRouter.get("/account/:id",  auth, getForm)

userRouter.put("/account/:id", upload.fields([{name:"profileImg"}, {name:"cv"}, {name:"signature"}]),  postUser)
userRouter.get("/success/",  auth, getSuccess)
userRouter.post("/success",   generateReport)





module.exports =  userRouter;