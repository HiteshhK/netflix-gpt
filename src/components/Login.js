import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
const [isSignInForm,setIsSignInForm]= useState(true);
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_small.jpg" 
                alt="logo"
            />
        </div>
    <form className='absolute p-12 text-white bg-black w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm &&<input type='text' placeholder='Full Name' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>}
        <input type='text' placeholder='Email Address' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>
        <input type='password' placeholder='Password' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>
        <button  className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In"}</p>
    </form>
    </div>
  )
}

export default Login