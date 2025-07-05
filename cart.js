const mongoose = require('mongoose');

const cartSchema=mongoose.Schema({
   userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
})
const CartModel=mongoose.model("cart",cartSchema)
module.exports=CartModel