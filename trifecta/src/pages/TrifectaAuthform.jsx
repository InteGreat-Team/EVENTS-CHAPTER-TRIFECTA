import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
import React, { useState } from "react";
import { UserAuth } from '../hooks/useAuthContext';
import "../components/authentication/trifectaStyles.css";

function Button({ value }) {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <button onClick={handleClick} className="button">
      {value}
    </button>
  );
}

function Input({ type, id, name, label, placeholder, autofocus }) {
  return (
    <label className="input-label">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}

export function TrifectaLoginForm() {
  const { login } = UserAuth();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    try {
      // Make a POST request to your Express server's signin endpoint
      const response = await axios.post('http://localhost:3001/api/signin', {
        email,
        password,
      });

      // Handle the success response from the server
      console.log("Login successfully ", response.data);

      // Handle the success response from the server
      const token = response.data.token;
      
      // Use the login function to update the authentication state
      login(token);

      for (const key in state) {
        setState({
          ...state,
          [key]: ""
        });
      }
    } catch(error){
      // Handle errors, e.g., show an error message to the user
      console.error('Error during signin:', error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">TRIFECTA LOG IN</h1>
        <form onSubmit={handleOnSubmit}>
          <div style={{ display: 'flex'}}>
            <Input
              type="email"
              id="email"
              name="email"
              label="Email Address"
              placeholder="me@example.com"
              autofocus={true}
              onChange={handleChange}
              value={state.email}
            />
          </div>
          <div style={{ display: 'flex', position: 'relative'}}>
            <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                label="&nbsp;&nbsp;&nbsp;Password &nbsp;&nbsp;&nbsp;"
                placeholder="••••••••••"
                onChange={handleChange}
                value={state.password}
            />
                <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="password-toggle"
                style={{ marginTop: '20px'}}
                >
                {showPassword ? <IoEyeOff size={20} color="#666" style={{ zIndex: 2 }}/> : <IoEyeSharp size={20} color="#666" style={{ zIndex: 2 }}/>}
                </button>
            </div>
          {/* <a href="#">Forgot your password?</a> */}
          <Button value="Sign In" />
        </form>
      </div>
    </div>
  );
}