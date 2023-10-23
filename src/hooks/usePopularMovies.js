import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies=()=>{
    const dispatch=useDispatch();
    const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
  
    const getPopularMoves= async()=>{
      const data= await fetch(url,API_OPTIONS);
      const json= await data.json();
      dispatch(addPopularMovies(json.results));
    }
  
    useEffect(()=>{
        getPopularMoves();
    },[])
}

export default usePopularMovies;