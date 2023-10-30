import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies=()=>{
    const popularMovies=useSelector(store=>store.movies.popularMovies);
    
    const dispatch=useDispatch();
    const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
  
    const getPopularMoves= async()=>{
      const data= await fetch(url,API_OPTIONS);
      const json= await data.json();
      dispatch(addPopularMovies(json.results));
    }
  
    useEffect(()=>{
      !popularMovies && getPopularMoves();
    },[])
}

export default usePopularMovies;