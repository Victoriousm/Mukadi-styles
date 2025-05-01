import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    
    <div>
         {React.createElement('span', null, )}
         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-60' alt="" />
                <p className='w-full max-w-2xl mx-auto px-4 text-gray-600'>
                Mukadi Styles: The epitome of timeless elegance,where confidence is couture.Mukadi Styles is not just a fashion house, it is a movement. We believe in dressing for yourself, for your confidence, for your story. Mukadi Styles is about embracing individuality, pushing boundaries, and making a statement.  We craft timeless pieces that transcend trends, blending modern silhouettes with luxurious fabrics and intricate details.  Our designs are meant to empower, to elevate, to inspire you to be your most authentic self. 
                </p>
            </div>
            <div>
                <p className='text-xl  font-medium mb-5 grid'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li> About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+79874242743</li>
                    <li>mukadiamvictorious@gmail.com</li>

                </ul>
            </div>

         </div>
         <div>
            <hr />
            <p  className='py-5 text-sm text-center '>Copyright @mukadistyles.com </p>
         </div>

      
    </div>
  )
}

export default Footer
