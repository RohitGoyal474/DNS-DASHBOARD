import React from "react";

import { useState, useRef } from "react";
// import { checkSignInValidData, checkSignUpValidData } from "../utils/validate";


import { useNavigate } from "react-router-dom";
import { Register, userLogin } from "../API/userAPI";


const Login = () => {
//   const dispatch = useDispatch();
  const [SignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setSignInForm(!SignInForm);
  };

//   const handleButtonClick = () => {
   

//     if (!SignInForm) {
//       const validation = checkSignUpValidData(
//         email.current.value,
//         password.current.value,
//         fullname.current.value
//       );
//       setErrorMessage(validation);

//       if (validation) return;

//       createUserWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value
//       )
//         .then((userCredential) => {
//           // Signed up

//           // ...
//           updateProfile(auth.currentUser, {
//             displayName: fullname.current.value,
//             photoURL: USER_AVATAR,
//           })
//             .then(() => {
//               // Profile updated!
//               // ...
//               const { uid, email, displayName, photoURL } = auth?.currentUser;
//               dispatch(
//                 addUser({
//                   uid: uid,
//                   email: email,
//                   displayName: displayName,
//                   photoURL: photoURL,
//                 })
//               );

//               navigate("/browse");
//             })
//             .catch((error) => {
//               // An error occurred
//               // ...
//               setErrorMessage(error.message);
//             });
//         })

//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + " " + errorMessage);
//           // ..
//         });
//     } else {
//       const validation = checkSignInValidData(
//         email.current.value,
//         password.current.value
//       );
//       setErrorMessage(validation);

//       if (validation) return;
//       signInWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value
//       )
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           // ...
//           console.log(user);
//           navigate("/browse");
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + " " + errorMessage);
//           console.log(errorCode + " " + errorMessage);
//         });
//     }
//   };
  
    const handleButtonClick = async() => {
        if(!SignInForm){
            console.log("test");
            console.log(email.current.value);
            console.log(password.current.value);
            const input = {
              username: fullname.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            try {
              const registerData = await Register(input);
              navigate("/Dashboard");
            } catch (error) {
              console.log(error);
            }

        }
        else{
            const input={
                email:email.current.value,
                password:password.current.value
            }
            try {
              const LoginData = await userLogin(input);
              console.log("login;",LoginData);
              navigate("/Dashboard");
            } catch (error) {
              console.log(error);
            }
        }
        
        
    }
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
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700"
        />
      )}

      <input
        ref={email}
        type="text"
        placeholder="Email"
        className="p-4 my-4 w-full bg-gray-700"
        onChange={() => setErrorMessage(null)}
      />
      <input
        ref={password}
        type="text"
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
