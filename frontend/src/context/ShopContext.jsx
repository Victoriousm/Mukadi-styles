/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = ({children})=>{
    const currency = 'K'
    const delivery_fee = 150;
    const [search,setSearch]= useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate()


    const addToCart = async (itemId,size) =>{
        let cartData = structuredClone(cartItems);
         //using this if statement we will output the message,this is using react tostify
        if (!size) {
            toast.error('Select Product Size');
            return;
            
        }

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

    }

    //function that calculates the total amount in the cart
     const getCartAmount =()=>{
        let totalAmount =0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product.id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]> 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                    
                // eslint-disable-next-line no-unused-vars
                } catch (error) {
                       // Handle any potential errors here 
                }
            }
        }
        return totalAmount
     }

   
    

    // this step is so provided so we can use these properties in any other component
    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount,navigate
        

    }

    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
