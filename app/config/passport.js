
const LocalStrategy = require('passport-local').Strategy      // we installed it using NPM 
const User = require('../models/user')
const bcrypt = require('bcrypt')






function init(passport){
     // its first parameter takes that what is the username in our app lilke (phone no, email,username etc..)
     // second parameter is what we used to login that we will get here in a callback function
    passport.use(new LocalStrategy({usernameField:'email' },async (email,password,done)=>{
      //login
      //check if email exist
      // This will give the whole user object from the data base 
        const user =  await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:'Check the email or password entered'})
        }

         bcrypt.compare(password,user.password).then(match =>{
             if(match){
                 return done(null,user,{message:'Succesfull logged In'})
             }
               return done(null,false,{message:'Check the email or password entered'})
         }).catch(err =>{
             return done(null,false,{message:'Something went wrong'})
         })
    }))
   // If the user gets loggesIn we will store something in session using this we will store user._id
   // if the password is matched at 25line it returns "user" , that we will get here as parameter
    passport.serializeUser((user, done)=>{
            done(null,user._id,)
    })
   
    // we are getting the user from data base using "id"
    // here we will get what we stored in 35line in the session as  Parameter
    passport.deserializeUser((id,done)=>{
       User.findById(id,(err,user)=>{
           done(err,user)
       })
    })
    //now we can use req.user as we passed the "user" in the done

}


module.exports = init

