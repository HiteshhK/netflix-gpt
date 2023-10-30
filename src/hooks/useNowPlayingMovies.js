import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies=()=>{
    const nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies);
    const dispatch=useDispatch();
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
  
    const getNowPlayingMoves= async()=>{
      const data= await fetch(url,API_OPTIONS);
      const json= await data.json();
      dispatch(addNowPlayingMovies(json.results));
    }
  
    useEffect(()=>{
     !nowPlayingMovies && getNowPlayingMoves();
    },[])
}

export default useNowPlayingMovies;