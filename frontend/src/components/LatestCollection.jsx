import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const[LatestProducts,setLatestProducts] = useState([])

    useEffect(() =>{

        setLatestProducts(products.slice(0,10))
    },[])
   
  return (
    <div className='my-10 '>
      {React.createElement('span', null,)}
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-sm sm:text-sm md:text--gray-600'>
        New Arrivals: Your wardrobe just got a whole lot more exciting,Warning: Browsing new arrivals may result in uncontrollable shopping sprees.
        </p>
      </div>
      {/* rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-5'>
        {
            LatestProducts.map((item,index)=>(
                <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
            ))
           
        }
      </div>

        

    </div>
  )
}

export default LatestCollection
