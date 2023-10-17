import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

  return (
    <div className=' h-screen w-full flex flex-col items-center justify-center bg-[#1a2238]'>
      <h1 className=' text-9xl font-extrabold text-white tracking-widest'>404</h1>
      <div className=' bg-black rounded rotate-12 absolute text-white text-sm px-2'>
        Page Not Found... 
      </div>
      <button className=' mt-5'>
        <a className='relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring'>
            <span className=' relative block px-8 py-3 bg-[#1A2238] border border-current' onClick={()=> navigate(-1)}>
                Go Back
            </span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
