/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();
const backendUrl = "http://localhost:4000";//import.meta.env.VITE_BACKEND_URL

const ShopContextProvider = ({children})=>{
    const currency = 'K'
    const delivery_fee = 150;
    const [search,setSearch]= useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate = useNavigate()


    const addToCart = async (itemId,size) =>{
         //using this if statement we will output the message,this is using react tostify
        if (!size) {
            toast.error('Select Product Size');
            return;
            
        }

        let cartData = structuredClone(cartItems); 

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                // addition of product entry for exact same stuff
                cartData[itemId][size] += 1;
                
            }
            // for complete new entry if both entries are not the same 
            else{
                cartData[itemId][size] = 1;
            }
        }
        // if we dont have the same item id
        else{
            cartData[itemId]= {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
            try {
                
                await axios.post("http://localhost:4000" + '/api/cart/add',{itemId,size} , {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
                
            }
        }
    }

   const getCartCount = () => {
       let totalCount = 0;

      // for items
       for (const items in cartItems) {
        // for product sizes
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]; // This sums the quantities correctly
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                // Handle any potential errors here
            }
        }
    }
    return totalCount ; // This will return the total count of all items in the cart
    };

   //for updating the quantity aka deleting
    const updateQuantity = async(itemId,size,quantity) =>{
        let cartData  = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {

            try {
                

                await axios.post( "http://localhost:4000" + '/api/cart/update' , {itemId,size,quantity} , {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
                
            }
            
        }

    }

    //function that calculates the total amount in the cart
     const getCartAmount =()=>{
        let totalAmount =0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            console.log(`cartItems: `+ cartItems[items]);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]> 0){
                        console.log(`cartItems[items][item]` + cartItems[items][item] + `itemInfo.price` + itemInfo.price)
                        totalAmount += itemInfo.price * cartItems[items][item]
                        
                    }
                    
                // eslint-disable-next-line no-unused-vars
                } catch (error) {
                       // Handle any potential errors here 
                }
            }
            console.log(``)
        }
        return totalAmount
     }
     
     const getProductsData = async ()=>{

        try {

            const response = await axios.get("http://localhost:4000" + '/api/product/list')
          
            if(response.data.success){
                
                setProducts(response.data.products)
                // console.log(`length: ${products}`)
            }
            else{
                toast.error(response.data.message)
            }

            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
     }

     const getUserCart = async (token) => {
        try {
            
            const response = await axios.post("http://localhost:4000" + '/api/cart/get' ,{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
     }
     
     useEffect(()=>{
       
        getProductsData()
     },[])

     useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            
        }
     })
   
    

    // this step is so provided so we can use these properties in any other component
    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token
       
        

    }

    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
