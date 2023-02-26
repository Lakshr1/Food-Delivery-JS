










//it's front end javascript file that's why to interact with the backend file we need axios to post request (same as form)



import  axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart') //  this query selector all will give the array all results
let cartCounter = document.querySelector('#cartCounter')

function updateCart(items){
    //items is the data we are getting from the button at 'data-items'
    //sending items to cartController and it is creating a session
    axios.post('/update-cart',items).then(res =>{      // (res =>{}) same thing  
              
              cartCounter.innerText = res.data.totalQty      // from controller we are getting this response
        new Noty({
            type:'success',
            timeout:1000, 
            progressBar:false,
            // layout:'topleft',
            text:'Item added to cart'
            
        }).show() 
    }).catch(err =>{
        new Noty({
            type:'error',
            timeout:1000, 
            progressBar:false,
            // layout:'topleft',
            text:'Something went wrong'
            
        }).show()
    })
}

addToCart.forEach((btn)=>{                   // we gave the name btn to the element of the array
    btn.addEventListener('click',(e)=>{
 // this is getting from home.ejs data-(ourname) ie. data-items 
        let items = JSON.parse(btn.dataset.items)        // It will convert the json string format to object  
        updateCart(items)                               // made a funciton and sending our object to it
        // console.log(items) 

    })
})






