import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const { movieNames, tmdbMovieResults } = useSelector(store => store.gpt);
    if (!movieNames) return null;// show shimmer UI

    return (
        <div className='p-4 bg-black text-white bg-opacity-90'>
            <div>
              {movieNames.map((movieName, index) => 
                <MovieList 
                    key={movieName} 
                    title={movieName} 
                    movies={tmdbMovieResults[index]} />
                )}
            </div>
        </div>
    )
}

export default GptMovieSuggestions