import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
        <Header />
        <div>
          <img 
              src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_small.jpg'
              alt='background'
              className='absolute'
          />
        </div>
        
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='text-3xl py-4 font-bold'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 outline-none' />}
          <input type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 outline-none' />
          <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 outline-none' />
          <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignIn ? "Sign In" : "Sign Up"}</button>
          <p onClick={toggleSignIn} className='my-4 cursor-pointer'>{isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login