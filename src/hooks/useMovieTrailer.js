import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo=useSelector(store=>store.movies.trailerVideo);

    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const getMovieVideos = async () => {
        const data = await fetch(url, API_OPTIONS)
        const movieJson = await data.json();
        const filterData = movieJson.results?.filter(video => video.type == "Trailer");
        const trailer = filterData?.length ? filterData?.[0] : movieJson.results[0];
        dispatch(addTrailerVideo(trailer));
    }
    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, []);
}

export default useMovieTrailer;