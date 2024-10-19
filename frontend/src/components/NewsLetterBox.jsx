import React from 'react'

const NewsLetterBox = () => {
    
    const onSubmitHandler = (event) =>{
        event.preventDefault(); //so that after we click the submit button the page will not reload

    }

  return (
    <div className='text-center'>
          {React.createElement('span', null,)}
          <p className='text-2xl font-medium text-grey-800'>Subcribe now and get 20% off</p>
          <p className='text-gray-400 mt-3'>
              Subcribe to our channel to get more notifications each time we have new arrivals
          </p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email 'required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
          </form>

      
    </div>
  )
}

export default NewsLetterBox
