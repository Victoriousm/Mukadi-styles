import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const contact = () => {
  return (
    <div>
      {React.createElement('span', null, )}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6 '>
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>
          <p className='text-gray-500'>Panganani Road Lusaka Zambia</p>
          <p className='text-gray-500'> Tel: 89874242743 <br /> mukadiamvictorious@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Mukadi Styles</p>
          <p className='text-gray-500'>Lear more about our teams and openings</p>
          <button className='border border-blavk px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Expore Jobs</button>
        </div>

      </div>
      <NewsLetterBox/>

    </div>
  )
}

export default contact
