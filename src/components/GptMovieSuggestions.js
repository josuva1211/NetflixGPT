import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {

  const { gptMovies, gptResults } = useSelector(store => store.gpt)
  if (!gptMovies || gptMovies.length === 0) return null;

  return (
    <div className='p-4 m-6 bg-black text-white bg-opacity-90'>
      <div>
        {gptMovies.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={gptResults[index]} />
        ))}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions;