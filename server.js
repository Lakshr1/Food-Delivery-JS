












// imported 'dotenv' at the top to insure it works properly when we use at any line of code
require('dotenv').config()             
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require("ejs")
const expressLayout = require('express-ejs-layouts')  // help to compine the seperate codes ejs
const mongoose = require('mongoose')                  // connect mongodb with our app
const path = require('path')
const session = require('express-session')      // to create session and cookies
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo') // to store cookies in our mongo database 
const passport = require('passport')         // this will help in login authentication

//database connection

const url = 'mongoose url'
const connectDB = async ()=>{
    try{
const con = await mongoose.connect(url,{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    
})
console.log('MongoDB connected :] ')
    }catch(err){
    console.log(err);
    process.exit(1);
    }
}

connectDB();






//session store : We are storing the session in the mongostore  but in place of this we used line:62-64
// let mongoStore= new MongoDbStore({
//     mongooseConnection: mongoose.connection,
//     collection:'sessions'
// })

// session configuration
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: url,
    }),
    saveUninitialized:false,
    cookie:{maxAge:1000 * 60 * 60 * 24}  // age of the cookie in milisecond , here it is 24 hours
    
}))



//Passport config  // Always after session configuration
const passportInit = require('./app/config/passport')
passportInit(passport)                    // sending the "passport" we imported here so we can use it in passport.js
app.use(passport.initialize())            // initializing the passport
app.use(passport.session())               // the works with the sessions so this is required





app.use(flash())   //express-flash  : this help for the flash message for express





//assests 
app.use(express.static('public'))
// to get the resgister data in object form we use this
app.use(express.urlencoded({
    extended:false,
}))
// enable json reading for express
app.use(express.json())  






// Global middleware : we can use this in the font side also

app.use((req,res,next)=>{
//this will store the whole session in the res.locals.session so when we refresh the page we can still have it in the res
res.locals.session = req.session  // this will save the cart number in the local so we can access at front
res.locals.user = req.user
next()               // this will let the work process to continue as it is 
})







app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)   // sending app instance to web.js file and getting the function from it.



app.listen(3000,()=>{
    console.log("The server is running :] ")
})
