const express=require("express")//import
require("./connection")
var proModel=require("./model/Product")
var userModel=require("./model/User")
const CartModel = require('./Model/cart');
var cors = require('cors')

const app = express()//initialization

app.use(express.json());//mid
app.use(cors());

//add api for product
app.post('/add',async(req, res) => {
    try {
        await proModel(req.body).save()
        res.send({message:"Data added!"})
    } catch (error) {
        console.log(error)
    }
})

//view api
app.get("/view",async(req,res)=>{
  try {
        var data=await proModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
//delete api
app.delete("/del/:id",async(req,res)=>{
  try {
        await proModel.findByIdAndDelete(req.params.id)
        res.send({message:"Data deleted!"})
    } catch (error) {
        console.log(error)
    }
})

//update api
app.put("/update/:id",async(req,res)=>{
  try {
        await proModel.findByIdAndUpdate(req.params.id,req.body)
        res.send({message:"Data updated!"})
    } catch (error) {
        console.log(error)
    }
})



//signup user

app.post('/uadd',async(req, res) => {
    try {
        await userModel(req.body).save()
        res.send({message:"Signed Up!"})
    } catch (error) {
        console.log(error)
    }
})
app.get("/uview",async(req,res)=>{
  try {
        var data=await userModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
//login
app.post("/login",async(req,res)=>{
    try {
        var user=await userModel.findOne({Email:req.body.Email});//findone for searching one candidate
        if(!user){
            return res.send({message:"User not found"});
        }
        if(user.Password===req.body.Password){
            return res.send({message:"Logged in successfully",
            userType:user.userType,
            name:user.Name,
            email:user.Email,
            userId:user._id
            });
            
        }
        else{
            return res.send({message:"Invalid credentials"});
        }
    } catch (error) {
        console.log(error)
        return res.send({message:"Error occured"})
    }
})


//cart
app.post("/add-to-cart", async (req,res) => {
    try{
        await CartModel(req.body).save();
        res.send({message: "Added to Cart!" });
    } catch(error) {
        console.log(error);
        res.send({message: "Failed to add to cart" });
    }
});


app.get("/my-cart/:userId", async (req,res) => {
    try{
        const cartItems = await CartModel.find({ userId: req.params.userId }).populate("productId");
        res.send(cartItems);
    } catch(err) {
        res.send({message: "Error fetching cart" });
    }
});

app.listen(3000,() => {
  console.log("Port is running ")
})//port setting 