import React from 'react'
import lang from '../utils/languageConstants';

const GptSearchBar = () => {
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'>
            <input type='text' className='p-4 m-4 col-span-9' placeholder={lang.hindi.gptSearchPlaceholder} /> 
            <button className='bg-red-700 text-white rounded-lg py-2 px-4 m-4 col-span-3'>{lang.hindi.search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;