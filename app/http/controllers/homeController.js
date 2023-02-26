








const Menu = require('../../models/menu')




function homeController (){
    return{

        // the req,res is automatically passed as parameter by app.get method as its second parameter
        // this whole index code will be exported there 
        async index(req,res){

            // 1st way

          const mydata = await Menu.find()
          return res.render('home',{allmenu:mydata})
          


          //2nd way

        //   Menu.find().then(function (mydata){    // this will have all the data of from the database 
        //     console.log(mydata)
        //     res.render('home',{allmenu:mydata})       // this will send the data to the front end   
        //    })
           
        }
    }


}

module.exports = homeController

