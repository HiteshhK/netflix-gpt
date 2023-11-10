import React, { useRef } from 'react'
import openai from '../utils/openai';
import { useDispatch, useSelector } from 'react-redux';
import { addGptMovieResult, addOpenaiKey } from '../utils/gptSlice';
import { API_OPTIONS } from '../utils/constants';

const GptSearchBar = () => {
  const dispatch= useDispatch();
  const OPENAI_API_KEY = useSelector(store=>store.gpt.key);
  const openaiKey=useRef(null);
  const searchText=useRef(null);
  const resetKey=()=>{
    dispatch(addOpenaiKey(null));
    openaiKey.current.value=null;
  }
  // Add openAI key
  const addOpenAIKey=()=>{
    dispatch(addOpenaiKey(openaiKey.current.value));
  }

  // Search TMDB movie
  const searchTMDBMovie=async(movie)=>{
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`
    ,API_OPTIONS);
    const json=await data.json();
    return json.results;
  }


  // Handle search text box actions
  const handleSearch= async()=>{
   // Only make backend request if there is key present
   if(!OPENAI_API_KEY) return;
    
   // Make an API call to GPT API and get movie Results
    const getQuery=`Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value}. only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, sholay, Don, Golmal, krrish`;
    const gptResults = await openai(OPENAI_API_KEY).chat.completions.create({
        messages: [{ role: 'user', content:  getQuery}],
        model: 'gpt-3.5-turbo',
      });
      if(!gptResults.choices){
        // TODO(): write error handling!
      }

      const gptMovies=gptResults.choices[0]?.message?.content.split(",");

      // For each movie I will search TMDB API
      const promiseArray = gptMovies.map(movie=>searchTMDBMovie(movie));

      const tmdbResuls=await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames:gptMovies,tmdbMovieResults:tmdbResuls}));
  }
  return (
    <div className='pt-[40%] md:pt-[10%] flex justify-center'>
        <form onSubmit={(e)=>e.preventDefault()} 
              className='w-full md:w-1/2 bg-black grid grid-cols-12'>
            {OPENAI_API_KEY&&<input
                ref={searchText}
                type="text"
                className='p-4 m-4 col-span-6'
                placeholder='What would you like to watch today?'
            />}
            {!OPENAI_API_KEY&&<input
                ref={openaiKey}
                type="text"
                className='p-4 m-4 col-span-6'
                placeholder='Please provide openAI Key'
            />}
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
                type="button" onClick={OPENAI_API_KEY?handleSearch:addOpenAIKey}>
                {OPENAI_API_KEY?"Search":'Add'}
            </button>
            <button className='col-span-3 m-4 py-2 px-4 bg-green-700 text-white rounded-lg'
                type="button" onClick={resetKey}>
                Reset Key
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar