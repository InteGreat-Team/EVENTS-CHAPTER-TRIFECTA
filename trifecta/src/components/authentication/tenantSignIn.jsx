import React, { useState, useEffect } from "react";
import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
import { UserAuth } from '../../hooks/useAuthContext.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../server/FirebaseClient.js';
import "./tenantStyles.css";
import { useNavigate } from 'react-router-dom';
import { EmailResetSuccessPopup, EmailResetInvalidPopup, InvalidLoginCredentialsPopup } from '../../global/Popup.jsx';
import {checkEmailExists} from '../../server/API/authAPI.js';

function SignInForm() {
  const { logIn, resetPassword } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isForgotPasswordClicked, SetIsForgotPasswordClicked] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (!isForgotPasswordClicked) {
      setState(prevState => ({ ...prevState, email: '', password: '' }));
    }
  },[isForgotPasswordClicked]);

  useEffect(() => {
    if (isInvalid && error) {
      const timer = setTimeout(
        () => setIsInvalid(!isInvalid),
        5000,
      );

      return () => clearTimeout(timer);
    }

    if (!isResetSuccessful || isResetSuccessful) {
      const timer2 = setTimeout(
        () => setIsResetSuccessful(null),
        5000,
      );

      return () => clearTimeout(timer2);
    }
  }, [isInvalid, error, isResetSuccessful]);

  const [showPassword, setShowPassword] = useState(false);

  const toggleForgotPassword = () => {
    SetIsForgotPasswordClicked(!isForgotPasswordClicked);
    console.log("toggleForgotPassword: " + toggleForgotPassword);
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (evt) => {
    setError('');
    evt.preventDefault();

    const { email, password } = state;
    try {
      // Use Firebase authentication method to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Access the user object
      const user = userCredential.user;

      await logIn(email, password);

      for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }

      // Log success message or perform any additional actions
      console.log('Login successful:', user);

      navigate('/dashboard');

    } catch (error) {
        setError(error.message);
        setIsInvalid(true);
        if (error.response) {
          console.error('Error during signin:', error.response.data.message);
        } else {
          console.error('Error during signin:', error.message);
        }
      }
  };

  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    setError('');
    setIsInvalid(false);
    setIsResetSuccessful(null);
    try {
      await resetPassword(state.email);
      const { exists } = await checkEmailExists(state.email);
      console.log(exists);
      if (!exists) {
        throw new Error('Email does not exist');
      }
      setIsResetSuccessful(true);
      console.log('Password reset successful');
        for (const key in state) {
        setState({
          ...state,
          [key]: ""
        });
      }
    } catch (error) {
        setError(error.message);
        console.log('wrong');
        setIsResetSuccessful(false);
      }
  };

  return (
    <div className="form-container sign-in-container lg:w-[24rem] lg:max-w-none w-full ">
      <form 
        className="bg-white flex items-center justify-center flex-col px-10 h-full text-center" 
        onSubmit={isForgotPasswordClicked ? handleResetPassword : handleOnSubmit}
      >
        {isInvalid && !isForgotPasswordClicked && (
          <InvalidLoginCredentialsPopup className="justify-start"/>
        )}
        {isResetSuccessful === true && (
          <EmailResetSuccessPopup className="flex-start" />
        )}
        {isResetSuccessful === false && (
          <EmailResetInvalidPopup className="flex-start" />
        )}

        {isForgotPasswordClicked ? <h1 className="font-bold m-0">Reset Password</h1> : <h1 className="font-bold m-0">Sign in</h1> }

        <input
          className="bg-gray-100 border-none p-3 my-1 w-full"
          type="email"
          placeholder="Email"
          name="email"
          value={state.email === null && isForgotPasswordClicked ? '' : state.email}
          onChange={handleChange}
        />
        {!isForgotPasswordClicked && (
          <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
          <input
            className="bg-gray-100 border-none p-3 my-1 w-full"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <button
              type="button" 
              onClick={togglePasswordVisibility} 
              className="password-toggle"
            >
            {showPassword ? <IoEyeOff size={20} color="#666" /> : <IoEyeSharp size={20} color="#666" />}
            </button>
          </div>
        )}
        {isForgotPasswordClicked ? <a className="text-blue cursor-pointer hover:underline" onClick={toggleForgotPassword}> Back to Sign In </a> : <a className="text-blue cursor-pointer hover:underline" onClick={toggleForgotPassword}> Forgot your password? </a> }
        {isForgotPasswordClicked ? <button className="bg-purple text-white text-xs font-bold py-3 px-12 uppercase">Reset</button> : <button className="bg-purple text-white text-xs font-bold py-3 px-12 uppercase">Sign In</button>}
      </form>
    </div>
  );
}

export default SignInForm;
