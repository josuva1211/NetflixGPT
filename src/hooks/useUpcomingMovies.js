import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
    
    const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

    const fetchUpcomingMovies = async () => {
        debugger;
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results));
      }
    
      useEffect(() => {
        !upcomingMovies && fetchUpcomingMovies();
      }, []);
}

export default useUpcomingMovies;