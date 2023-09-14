import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { addGptMovieResult, toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
    dispatch(addGptMovieResult({movieNames: [], movieResults: []}));
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
        <img 
            className='w-44'
            src={LOGO}
            alt='logo' 
        />
        {
          user && (
          <div className='flex m-4'>
            { showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select> }
            <img
              className='w-12 h-12'
              src={user.photoURL}
              alt='user'
            />
            <h1 className='mx-4 my-auto text-white font-bold text-2xl italic'>{user.displayName}</h1>
            <button className='bg-purple-800 text-white px-4 py-2 rounded-lg mx-4 my-2' onClick={handleGptSearch}>
              { showGptSearch ? "HomePage" : "GPT Search" }
            </button>
            <button className='font-bold text-white mx-4' onClick={handleSignOut}>Sign Out</button>
          </div>
          )
        }
    </div>
  )
}

export default Header