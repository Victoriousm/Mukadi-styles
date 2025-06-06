import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RealatedProducts from '../components/RealatedProducts';

const product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchproductData = async () =>{

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
        
      }
    })

  }

  useEffect(()=>{
    fetchproductData();
  },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* prodat data */}
      {React.createElement('span', null, )}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm;justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt="" />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-max ' src={image} alt="" />
          </div>

        </div>
        {/* product information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_dull_icon} alt="" className="w-5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-200 ${item === size ?'bg-pink-300 ' : '' }`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p> Cash on delivery is avaliable</p>
            <p>easy retuen and exchange policy within seven days</p>

          </div>
        </div>
       
        </div>
         {/* description and review section */}
         <div className='mt-20'>
          <div className='flex'> 
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
          </div>
          <div className='flex flex-col gap-4 border-6 py-6 text-gray-500'>
            <p>We want to take a moment to express our heartfelt appreciation to all our wonderful customers. Your support means the world to us and helps us celebrate the rich and vibrant culture of African fashion. Every time you choose our store, you’re not just purchasing clothing; you’re embracing heritage, artistry, and community. </p>
            <p>Thank you for being a part of our journey and for allowing us to share the beauty of African designs with you. We look forward to bringing you more unique styles that inspire and empower! </p>
          </div>
      </div>
      {/* display related products */}
      <RealatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
    // the div below is for incase we cannot find the product data saved so that will be displayed
  ) : <div className='opacity-0'></div>
}

export default product
