import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoginDisplay } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 z-10 opacity-75"></div>
      <div className="fixed top-0 right-0 bottom-0 bg-white z-20 border-black p-10 sm:w-4/12 rounded-md">
        <div className="flex justify-between">
          <div>
            <button
              className="mb-4"
              onClick={() => {
                dispatch(showLoginDisplay());
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
        <form className="flex flex-col mt-10">
          {isSignUp && (
            <input
              type="text"
              placeholder="Enter your name"
              className="p-6 border-x-gray-500 border-t-gray-500 border"
            />
          )}
          <input
            type="text"
            placeholder="Enter your email"
            className="p-6 border-gray-500 border"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="p-6 border-x-gray-500 border-b-gray-500 border"
          />
          <button className="bg-gray-200 p-2 mt-8 rounded-lg hover:bg-gray-400">
            {isSignUp ? "Continue" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
