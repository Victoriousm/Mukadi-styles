import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config

const app = express()
//backend starts on port 400 if port not avaliable
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// middlewares

app.use(express.json())
//lets us acess the backend from any ip
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send("API Working")

})

app.listen(port,()=> console.log('Server started on PORT :'+ port))