









//sending all the routes we made here to server

const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authContoller')
const cartController = require('../app/http/controllers/customers/cartController')
const validating = require('../app/http/middleware/guest')



// app is sent by the server.js while requiring it and here we can use app instance.
function initRoutes(app){

    //the second parameter of app.get automatically has req,res as parameter, so we can use it in the controller

    // here we recieve index function which already has req,res so this code will be replaced by index function
    app.get('/',validating().existuser, homeController().index)            

    // here homeController().index is replaces by this piece of code when homeController send index object
    // (req,res)=>{
    //     res.render('home')
    // }

    app.get('/cart',validating().existuser,cartController().index)
    app.post('/update-cart',cartController().update)

    app.get('/login',validating().guest,authController().login)
    app.post('/login',authController().postLogin)

    //for logout
    app.post('/logout',authController().postlogout)


    app.get('/register',validating().guest,authController().register)
    app.post('/register',authController().postRegister)
}


module.exports = initRoutes;





























