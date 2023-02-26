















function cartController(){
    return{
        index(req,res){
            res.render('customers/cart')
        },
        update(req,res){
// for the first time creating cart and adding basic object structure
            if(!req.session.cart){             // if the request does not have cart object then create
                req.session.cart= {
                    items:{
                        
                    },
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart= req.session.cart            // storing this format in a variable

            // check if that particular item does not exist in cart
            if(!cart.items[req.body._id]){         // also we can write it as req.session.cart.items[req.boy._id]
                cart.items[req.body._id]={
                    item:req.body,                     // req.body is the 'items' sent by axios.post
                    qty:1
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice +req.body.price 
            }else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty +1   // perticular item quantity
                cart.totalQty = cart.totalQty + 1                                // total no. of items
                cart.totalPrice = cart.totalPrice + req.body.price
            }






            return res.json({totalQty : req.session.cart.totalQty}) 
        }
    }
}



module.exports = cartController




























