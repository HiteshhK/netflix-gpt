import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants'
import { toggleGptSearchView } from '../utils/gptSlice'

const Header = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  const user=useSelector(store=>store.user );
  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth,(user)=>{
        if(user){
            //user is signed in
            const {uid,email,displayName,photoURL}=user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            navigate("/browse")
        }
        else{
            //user is signed out
            dispatch(removeUser());
            navigate("/")
        }
    });
    // unsubscribe with component unmount
    return ()=> unsubscribe();
},[]//call only once
)
const handleGptSearchClick=()=>{
  // Toggle GPT search
  dispatch(toggleGptSearchView());
}
  const handleSignout=()=>{
    signOut(auth).then(()=>{
    }).catch(err=>{
      navigate("/error")
    })
  }
  return (
    <div className="absolute w-screen flex justify-between px-8 py-2 bg-gradient-to-b from-black z-10">
        <img 
            className='w-44'
            src={LOGO} 
            alt="Logo"
        />
        {user && <div className='flex'>
          <button className='py-2 px-3 mx-2 my-2 bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}>{showGptSearch?"Homepage":"GPT Search"}</button>
          <img className='w-12 h-12' 
                alt="user-icon" 
                src={user?.photoURL}/>
          <button onClick={handleSignout} className='font-bold text-white'>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header