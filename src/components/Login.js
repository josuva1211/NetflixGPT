import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const navigate = useNavigate();
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
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/40683274?v=4"
        }).then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
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
        navigate("/browse");

        //console.log("Success");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User not found or Password is incorrect");
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
        <div>
          <img 
              src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_small.jpg'
              alt='background'
              className='absolute'
          />
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
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