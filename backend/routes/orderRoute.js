import express from 'express'

import{placeOrder,placeOrderAirtel,placeOrderVisa,allOrders,UserOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/visa',authUser,placeOrderVisa)
orderRouter.post('/airtel',authUser,placeOrderAirtel)

//user feature
orderRouter.post('/userorders',authUser,UserOrders)

export default orderRouter