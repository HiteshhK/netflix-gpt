import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { POSTER } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img 
                src={POSTER} 
                alt="logo"
            />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
  )
}

export default GPTSearch