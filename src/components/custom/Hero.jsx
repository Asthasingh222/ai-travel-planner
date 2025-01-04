import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    
    <div className='flex flex-row items-center mx-50 gap-6'>
         <div className='ml-10'>
         <h1 className='font-extrabold text-[55px]  mt-16'>
            <span className='text-[#543f88]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>  
            <p className='text-xl text-gray-500 mb-5'>
              Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={'/create-trip'}>
            <Button>Get Started, It's Free</Button>
            </Link>
         </div>
         <img src='/t3.avif' className='w-2/5 h-2/5 mr-10'/>
               
    </div>
  )
}

export default Hero