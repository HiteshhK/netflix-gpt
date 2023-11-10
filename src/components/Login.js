import React, { useState ,useRef} from 'react'
import Header from './Header';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { checkValidateData } from '../utils/validate';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {POSTER, USER_AVATAR_DEFAULT} from '../utils/constants'
const Login = () => {
const [isSignInForm,setIsSignInForm]= useState(true);
const name = useRef(null);
const email = useRef(null);
const pass = useRef(null);
const [errState,setErrState]=useState(null);
const dispatch=useDispatch();
const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
const handleButtonClick = () => {
    const errData = checkValidateData(email.current.value, pass.current.value);
    setErrState(errData);
    if(errData)return;
    if (!isSignInForm) {
        // signUp logic
        createUserWithEmailAndPassword(auth, email.current.value, pass.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                updateProfile(user,{
                    displayName:name.current.value,
                    photoURL:USER_AVATAR_DEFAULT
                }).then(()=>{
                    const {uid,displayName,email,photoURL}=auth.currentUser;
                    dispatch(addUser({uid:uid,displayName:displayName,photoURL:photoURL,email:email}));
                }).catch(err=>{
                    setErrState({type:"auth",msg:err.errorMessage});
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrState({type:'auth',msg:`${errorCode}-${errorMessage}`});
            });

    }
    else{
// SignIn Logic
        signInWithEmailAndPassword(auth,email.current.value,pass.current.value)
        .then((userCredential)=>{
            const user=userCredential.user;
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrState({type:'auth',msg:`${errorCode}-${errorMessage}`});
        });
    }
}
  return (
    <div>
        <Header/>
        <div className='absolute w-full'>
            <img 
                className='h-screen object-cover w-full'
                src={POSTER} 
                alt="logo"
            />
        </div>
    <form 
        onSubmit={(e)=>e.preventDefault()} 
        className='absolute p-12 text-white bg-black w-full md:w-4/12 my-36 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm &&<input ref={name} type='text' placeholder='Full Name' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>}
        <input ref={email} type='text' placeholder='Email Address' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>
        {errState?.type=="email" &&<p className='text-red-500 font-bold text-lg py-2'>{errState.msg}</p>}
        <input ref={pass} type='password' placeholder='Password' className='w-full p-4 my-4 bg-gray-700 rounded-lg'/>
        {errState?.type=="pass" &&<p className='text-red-500 font-bold text-lg py-2'>{errState.msg}</p>}
        <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
        {errState?.type=="auth" &&<p className='text-red-500 font-bold text-lg py-2'>{errState.msg}</p>}
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In"}</p>
    </form>
    </div>
  )
}

export default Login