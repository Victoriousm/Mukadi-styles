/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const about = () => {
  return (
    <div>
      {React.createElement('span', null, )}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
        <div className='my-10 flex flex-col md:flex-row gap-16 '>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 '>
             <p>In the vibrant heart of Accra, a visionary designer named Victorious  Mukadi founded Mukadi Styles, a fashion house that celebrates the rich tapestry of African heritage. Inspired by her grandmother's colorful kente cloth and the rhythmic beats of traditional drumming, Amina sought to blend contemporary designs with age-old craftsmanship. Each collection tells a story, weaving together threads of culture, identity, and resilience.</p>
             <p>Mukadi Styles quickly gained attention for its bold patterns and sustainable practices, using locally sourced materials and empowering artisans from surrounding communities. Fashion shows became a cultural phenomenon, drawing crowds eager to witness the fusion of modernity and tradition on the runway. Celebrities and influencers alike donned Mukadi’s creations, making it a symbol of pride across the continent</p>
             <b className='text-gray-800'>Our Mission</b>
             <p>“At Mukadi Styles, our mission is to celebrate and preserve the rich heritage of African culture through innovative fashion. We are dedicated to crafting contemporary designs that honor traditional craftsmanship, empowering local artisans and communities. By using sustainable materials and ethical practices, we aim to redefine global fashion narratives, inspire self-expression, and promote cultural pride. Through our creations, we strive to connect people across the world, weaving together stories of identity, resilience, and unity.”</p>

          </div>
        </div >

        </div>
        <div className='text-xl py-4'>
           <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Convenience:</b>
            <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority</p>
          </div>

        </div>
        <NewsLetterBox/>

    </div>
  )
}

export default about
