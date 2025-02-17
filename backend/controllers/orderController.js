import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using cash on delivery

const placeOrder = async (req, res) =>{
    try {
        const {userId, items, amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
        
    }

}

// placing orders using visa

const placeOrderVisa = async (req, res) =>{
    
}

// placing orders using mobile money

const placeOrderAirtel = async (req, res) =>{
    
}

//displaying all orders on our admin panel

const allOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

//user orders front end

const UserOrders = async (req, res) =>{

    try {

        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}


//update order status from admin panel
const updateStatus = async (req, res) =>{
    try {

        const {orderId,status} = req.body
        
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

export{placeOrder,placeOrderAirtel,placeOrderVisa,allOrders,UserOrders,updateStatus}