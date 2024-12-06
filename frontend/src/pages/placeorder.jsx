import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const placeorder = () => {
   
  // cash on delivery will be selected by default 
  const [method,setMethod]= useState('cod');
  const {navigate}= useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {React.createElement('span', null, )}
      {/* will be displayed on the left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='First name'/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Last name'/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email"  placeholder='Email Address'/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Street/house number'/>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='City'/>
          {/* <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Province'/> */}
          <select className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" required>
             <option value="lusaka">Lusaka</option>
             <option value="copperbelt">Copperbelt</option>
             <option value="easten">Eastern</option>
             <option value="southern">Southern</option>
             <option value="western">Western</option>
             <option value="Northern">Northern</option>
             <option value="northwestern">North-Western</option>
             <option value="muchinga">Muchinga</option>
             <option value="cental">Centeral</option>
             <option value="Luapula">Luapula</option>
          </select>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Passport or NRC number'/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='City acquired from'/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number"  placeholder='Phone'/>

      </div>
      {/* right side  */}
      <div className='mt-8'>
        <div className='mt-8 min-w-8'>
          <CartTotal/>
          <div className='mt-12'> 
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* payment method selection */}
            <div  className='flex gap-3 flex-col  lg:flex-row'>

              <div onClick={() => setMethod('airtel')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'airtel' ? 'bg-green-600' :'' }`}></p>
                <img className='h-5 mx-4' src={assets.airtel} alt="" />
              </div>

              <div onClick={() => setMethod('fnb')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'fnb' ? 'bg-green-600' :'' } `}></p>
                <img className='h-5 mx-4' src={assets.fnb} alt="" />
              </div>

              <div onClick={() => setMethod('visa')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'visa' ? 'bg-green-600' :'' } `}></p>
                <img className='h-5 mx-4' src={assets.visa_logo} alt="" />
              </div>

              <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' :'' }`}></p>
                <p className='text-gray-600 text-sm font-small mx-4'>CASH ON DELIVERY </p>
              </div>

            </div>
            <div className='w-full txt-end mt-8'>
              <button  onClick={() => navigate('/orders')}  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default placeorder
