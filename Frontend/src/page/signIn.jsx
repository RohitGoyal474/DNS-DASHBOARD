import React from "react";

import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Register, userLogin } from "../API/userAPI";

const Login = () => {
  const [SignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    console.log("SignInForm", SignInForm);
    setSignInForm(!SignInForm);
  };

  const handleButtonClick = async () => {
    
    if (!SignInForm) {
        console.log("register");
      const input = {
        username: fullname.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const registerData = await Register(input);
        console.log("register;", registerData);
        navigate("/Dashboard");
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.message);
        console.log("error message", errorMessage);
      }
    } else {
        console.log("signin");
      const input = {
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const LoginData = await userLogin(input);
        console.log("login;", LoginData);
        navigate("/Dashboard");
      } catch (error) {
        setErrorMessage("Invalid email or password");
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="absolute">
        <img
          src="https://img.freepik.com/free-vector/digital-red-circuit-lines-technology-background-design_1017-27263.jpg"
          alt=""
          className="h-screen w-screen object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {SignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!SignInForm && (
          <input
            ref={fullname}
            type="text"
            required
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          required
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700"
          onChange={() => setErrorMessage(null)}
        />
        <input
          ref={password}
          type="text"
          required
          placeholder="Password "
          className="p-4 my-4 w-full bg-gray-700"
          onChange={() => setErrorMessage(null)}
        />
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {SignInForm ? "Sign In" : "Sign Up"}
        </button>
        
        <div className="text-red-500">{errorMessage}</div>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {SignInForm
            ? "New to DNS DashBoard? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
