import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const language = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const fetchTMDBMovies = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {
    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Jailer, Gadar, Golmaal, RDX, Vikram";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
  
    console.log(gptResults.choices);

    const gptMovies = gptResults.choices[0].message.content.split(", ");
    console.log(gptMovies);

    const promiseArray = gptMovies.map(movie => fetchTMDBMovies(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  }

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[language].gptSearchPlaceholder} /> 
            <button onClick={handleGptSearchClick} className='bg-red-700 text-white rounded-lg py-2 px-4 m-4 col-span-3'>{lang[language].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;