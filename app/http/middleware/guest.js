













// we are exporting it to web.js and calling this middleware

function validating(){
    return{
        // if non loggedIn user is trying to come to home we are redirecting to login page
        existuser(req,res,next){
            // we are checking if the user is not logged , and if user is logges then we are sending to '/'
            if(!req.isAuthenticated()){
                res.redirect('/login')
            }
        
            else{
                return next();
            }
        }, 

        // if loggedIn user is trying to go to login page directly we are redirecting to home page
        guest(req,res,next){
            // we are checking if the user is not logged , and if user is logges then we are sending to '/'
            if(!req.isAuthenticated()){
                return next()
            }
        
            else{
                return res.redirect('/')
            }
        }
        

    }
}





module.exports = validating
