import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using cash on delivery
let delivery_fee = 150;


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

const placeOrderVisa = async (req, res) => {
  try {
    const { userId, items, amount, address, CardNumber, ExpiryDate, Cvv } = req.body;

    let paymentStatus = false;

    if (CardNumber && ExpiryDate && Cvv) {
      if (CardNumber.length > 0 && CardNumber.charAt(0) !== '0' && ExpiryDate.length === 5 && Cvv.length === 3) {
        paymentStatus = true;
      } else {
        return res.json({ success: false, message: "Invalid card details" });
      }
    } else {
      return res.json({ success: false, message: "Missing card details" });
    }

    const totalAmount = amount + delivery_fee;

    const orderData = {
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "Visa",
      payment: paymentStatus,
      date: Date.now(),
      delivery_fee: delivery_fee,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Visa Order Placed with Delivery Charge", totalAmount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderAirtel = async (req, res) => {
  try {
    const { userId, items, amount, address, mobileNumber } = req.body;

    let paymentStatus = false;

    if (mobileNumber) {
      if (mobileNumber.startsWith("0") && mobileNumber.length === 10) {
        paymentStatus = true;
      } else {
        return res.json({ success: false, message: "Invalid Mobile number" });
      }
    } else {
      return res.json({ success: false, message: "Missing Mobile number" });
    }

    const totalAmount = amount + delivery_fee;
    console.log("totalAmount: "+ totalAmount); 

    const orderData = {
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "Mobile Money",
      payment: paymentStatus,
      date: Date.now(),
      delivery_fee: delivery_fee,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Mobile Money Order Placed with Delivery Charge", totalAmount: totalAmount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

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