









const User  = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')


//login and register are this function's object

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
            // we will get (err,user,info) from what we returned from passport.js ,
            //1st parameter us our passport method/strategy , here we are using local method of passport 
            passport.authenticate('local',(err,user,info)=>{
                 if(err){
                     req.flash('error',info.message) // info has a key names "message"
                     return next(err)

                 }
                 if(!user){
                    req.flash('error',info.message) // info has a key names "message"
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                     if(err){
                        req.flash('error',info.message) // info has a key names "message"
                        return next(err)
                     }
                     return res.redirect('/')
                })

            })(req,res,next)
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const {name, email, password} = req.body   // saving the req.body fields in the const{name, email, ....}
            //validating genuine request
            if(!name || !email || !password){
                // sending it to register.ejs
                req.flash('error','All fields are requierd')
                req.flash('name',name)                      
                req.flash('email',email) 
                return res.redirect('/register')
            }

            //check if email already exists in the database using mongodb method 'exists()'
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','Email already taken')
                    req.flash('name',name)                      
                    req.flash('email',email) 
                    return res.redirect('/register')
                }
            } )
           
            const hashedPassword = await bcrypt.hash(password,10)
            // if everything is fine the creating new user with the values we have 
            const user = new User({
                name:name,
                email:email,
                // we dont put password directly
                password: hashedPassword
            })
            // now we have created the user now we will save it in the mongodb using '.save()'
            user.save().then((user)=>{
            //Login

            return res.redirect('/')

            }).catch(err =>{
                req.flash('error','Something went wrong')
                    
                    return res.redirect('/register') 
            })

            // console.log(req.body)
        },

        postlogout(req,res){
          req.logout()
          return res.redirect('/login')
        }

    }
}



module.exports = authController










