import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,10))
        
    },[products])
  return (
    <div className='my-10'>
        {React.createElement('span', null, )}
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
            Each piece embodies timeless elegance and undeniable style, designed to elevate your wardrobe and ignite your confidence.
            </p>

        </div>

        <div className='grid grid-col-2 sm:grid-col-4 lg:grid-cols-5 gap-4 gay-y-6'>
            {
                bestSeller.map((item,index) => (

                <ProductItem className='h-80'key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>

                ))
            }
        </div>


      
    </div>
  )
}

export default BestSeller
