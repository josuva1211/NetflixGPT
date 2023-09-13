import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_POSTER } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
          <img 
              src={BG_POSTER}
              alt='background'
          />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch;