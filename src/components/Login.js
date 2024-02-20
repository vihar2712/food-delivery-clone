import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, showLoginDisplay } from "../utils/userSlice";
import { validateData } from "../utils/validateData";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleValidation = () => {
    const validationResult = validateData(
      email.current?.value,
      password.current?.value,
      name.current?.value
    );
    console.log(validationResult);

    if (isSignUp) {
      //sign up validation
      if (!validationResult) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            user.displayName = name.current.value;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                // Profile updated!
                console.log(auth.currentUser);
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUserInfo({
                    uid,
                    email,
                    displayName,
                  })
                );
                dispatch(showLoginDisplay(false));
              })
              .catch((error) => {
                // An error occurred
                setErrMsg(error.message);
              });

            // console.log(user);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrMsg(errorMessage);
            setTimeout(() => setErrMsg(null), 2000);
          });
      } else {
        setErrMsg(validationResult);
        setTimeout(() => setErrMsg(null), 2000);
      }
    } else {
      if (!validationResult) {
        // sign in validation
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrMsg(errorMessage);
          });
      } else {
        setErrMsg("Invalid email or password");
        setTimeout(() => setErrMsg(null), 2000);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        console.log(user);
        const { uid, email, displayName } = user;
        dispatch(
          addUserInfo({
            uid,
            email,
            displayName,
          })
        );
        dispatch(showLoginDisplay(false));

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 z-10 opacity-75"></div>
      <div
        style={{
          left: "auto",
          right: 0 + "px",
          transform: "translate(" + 0 + "%," + 0 + "px)",
          transition: "transform .3s ease-out",
        }}
        className="fixed top-0 h-full bg-white z-20 border-black p-10 sm:w-4/12"
      >
        <div className="flex justify-between">
          <div>
            <button
              className="mb-4"
              onClick={() => {
                dispatch(showLoginDisplay(false));
              }}
            >
              ✕
            </button>
            <h1 className="text-2xl mb-4">{isSignUp ? "Sign Up" : "Log In"}</h1>
            <button
              className="mx-auto w-full hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already a user? Log In." : "New here ? Sign up now."}
            </button>
          </div>
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            className="w-20 mx-10"
          />
        </div>
        <form
          className="flex flex-col mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleValidation();
          }}
        >
          {isSignUp && (
            <input
              ref={name}
              type="text"
              placeholder="Enter your name"
              className="p-6 border-x-gray-500 border-t-gray-500 border"
              required
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Enter your email"
            className="p-6 border-gray-500 border"
            required
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter password"
            className="p-6 border-x-gray-500 border-b-gray-500 border"
            required
          />
          <button className="bg-gray-200 p-2 mt-8 rounded-lg hover:bg-gray-400">
            {isSignUp ? "Continue" : "Log In"}
          </button>
          {errMsg && <h1 className="text-red-600">{errMsg}</h1>}
        </form>
      </div>
    </div>
  );
};

export default Login;
