import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    const fetchTopRatedMovies = async () => {
        debugger;
        const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));
      }
    
      useEffect(() => {
        fetchTopRatedMovies();
      }, []);
}

export default useTopRatedMovies;