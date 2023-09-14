import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

    const fetchNowPlayingMovies = async () => {
        debugger;
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
      }
    
      useEffect(() => {
        !nowPlayingMovies && fetchNowPlayingMovies();
      }, []);
}

export default useNowPlayingMovies;