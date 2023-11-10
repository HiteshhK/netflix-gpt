import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { POSTER } from '../utils/constants'

const GPTSearch = () => {
  return (
    <>
     <div className='fixed -z-10 w-full'>
            <img 
                className='h-screen object-cover w-full'
                src={POSTER} 
                alt="logo"
            />
        </div>
    <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GPTSearch