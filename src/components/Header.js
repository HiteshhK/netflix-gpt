import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user );
  const handleSignout=()=>{
    signOut(auth).then(()=>{
      navigate("/");
    }).catch(err=>{
      console.log({err});
      // navigate("/error")
    })
  }
  return (
    <div className="absolute w-screen flex justify-between px-8 py-2 bg-gradient-to-b from-black z-10">
        <img 
            className='w-44'
            src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' 
            alt="Logo"
        />
        {user && <div className='flex'>
          <img className='w-12 h-12' 
                alt="user-icon" 
                src={user?.photoURL}/>
          <button onClick={handleSignout} className='font-bold text-white'>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header