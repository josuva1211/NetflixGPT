import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_POSTER, USER_AVATAR } from '../utils/constants';


const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMsg(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR
        }).then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        }).catch((error) => {
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + "-" + errorMessage);
        // ..
      });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg("User not found or Password is incorrect");
      });
    }
  }

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
        <Header />
        <div className='absolute'>
          <img 
              src={BG_POSTER}
              alt='background'
              className=''
          />
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className='w-full h-1/2 md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='text-3xl py-4 font-bold'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 outline-none' />}
          <input ref={email} type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 outline-none' />
          <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 outline-none' />
          <p className='text-red-500 font-bold text-2xl'>{errorMsg}</p>
          <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignIn ? "Sign In" : "Sign Up"}</button>
          <p onClick={toggleSignIn} className='my-4 cursor-pointer'>{isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login