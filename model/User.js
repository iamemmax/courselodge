const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const findOrCreate = require("mongoose-findorcreate")


const userSchema = new mongoose.Schema({
  firstname:{
    type: String,
    
    trim: true,
  }, 
  lastname:{
    type: String,
    
    
    trim: true,
  }, 

  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  dob:{
    type: String,
    
    trim: true,
  },
  country:{
    type: String,
    
    trim: true,
  },
  state:{
    type: String,
    
    trim: true,
  },
  lg:{
    type: String,
    
    trim: true,
  },

 
  profileImg:{
    type: String,
    
  },
  cv:{
    type: String,
    

  },
  
  signature:{
    type: String,
    
  },



  phone:{
    type:Number,
    
    trim: true,
  },

  
  gender:{
    type: String,
    
  },

  address:{
    type: String,
    
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },


  role: {
    type: String,
    enum: ["member", "Admin"],
    default: "member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashing user password before submitting to database
userSchema.pre("save", function (next) {
  if(!this.isModified('password')) return next

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next()
            });
        });

//   compare user password
        userSchema.methods.comparePassword = function(password, cb){
        bcrypt.compare(password, this.password, (err, isMatch)=>{
            if(err)return next(err)
            else
                if(!isMatch)
                    return next(err)
                return cb(null, this)
            

        })
    }
});


const user = mongoose.model("users", userSchema);
// exporting Schema
module.exports = user;
