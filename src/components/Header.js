import { useContext, useEffect, useState } from "react";
import { LOGO_URL } from "../utils/links";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserInfo,
  removeUserInfo,
  showLoginDisplay,
} from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  // const onlineStatus = useOnlineStatus();
  const userInfo = useSelector((store) => store.user?.userInfo);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUserInfo());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  // console.log("rendered");
  // console.log(onlineStatus + "----");

  // const userContext = useContext(UserContext);
  // console.log(userContext);

  // const { loggedInUser, loginTime } = userContext;

  // Selector is used to subscribe to the appStore

  const cartItems = useSelector((store) => store.cartR?.items);
  // console.log(cartItems);
  let totalQuantity = cartItems?.reduce(
    (newLength, item) => newLength + item.quantity,
    0
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // console.log(user);
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
    <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white shadow-md sticky top-0 z-10">
      <div className="logo">
        <Link to="/">
          <img className="w-28" src={LOGO_URL} alt="logo" />
        </Link>
      </div>
      <div className="sm:text-lg py-0 sm:py-10">
        <ul className="flex text-center flex-wrap justify-center ">
          {/* <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li> */}
          <Link to="/">
            {" "}
            <li className="px-1 sm:px-2 hover:font-semibold hover:text-green-700">
              Home
            </li>
          </Link>
          {/* <li className="px-2 hover:font-semibold hover:text-green-700">
            <Link to="/about">About Us</Link>
          </li> */}
          {/* <li className="px-1 sm:px-2 hover:font-semibold hover:text-green-700">
            <Link to="/contact">Contact Us</Link>
          </li> */}
          <Link to="/cart">
            <li className="px-1 sm:px-2 hover:font-semibold hover:text-green-700">
              Cart ({totalQuantity} items)
            </li>
          </Link>

          <li className="px-1 sm:pr-4 text-center ">
            {userInfo ? (
              <>
                <h1 className="font-medium">Hello, {userInfo.displayName}! </h1>
                <button
                  onClick={handleSignOut}
                  className="hover:font-semibold hover:text-green-700"
                >
                  (Sign Out)
                </button>
              </>
            ) : (
              <button
                className="hover:font-semibold hover:text-green-700"
                onClick={() => {
                  dispatch(showLoginDisplay(true));
                }}
              >
                Login
              </button>
            )}
          </li>
          {/* <li className="px-2 hover:font-bold">
            {loggedInUser} at {loginTime}
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
