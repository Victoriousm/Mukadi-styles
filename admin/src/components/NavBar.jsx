/* eslint-disable react/prop-types */
import React from 'react'
import {assets} from '../assets/assets'


const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
         {React.createElement('span', null, )}
         <img className='w-[max(10%,80px)] py-2' src={assets.logo} alt="" />
         <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-5 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
      
    </div>
  )
}

export default NavBar
