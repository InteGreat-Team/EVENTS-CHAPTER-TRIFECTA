import React, { useState } from "react";
import SignInForm from "../components/authentication/tenantSignIn.jsx";
import SignUpForm from "../components/authentication/tenantSignUp.jsx";
import "../components/authentication/tenantStyles.css";

export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold m-0">Welcome Back!</h1>
              <p >
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border-white border-solid border py-3 px-12 m-4 text-white text-xs font-bold uppercase"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold m-0">Hello, Friend!</h1>
              <p className="text-base font-hairline leading-5 tracking-wide my-5">Register your company and start your journey with us!</p>
              <button
                className="bg-transparent border-white border-solid border py-3 px-12 text-white text-xs font-bold uppercase"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
