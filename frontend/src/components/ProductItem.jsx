/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext)
    
  return (
    <Link className='text-grey-700 cursor-pointer' to={`/product/${id}`}>
      {React.createElement('span', null,)}
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out h-80 w-full object-cover rounded-full' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
