import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/links";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo, showLoginDisplay } from "../utils/userSlice";
import { signOut } from "firebase/auth";
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

  return (
    <div className="flex justify-between bg-green-100 shadow-md sticky top-0 z-10">
      <div className="logo">
        <Link to="/">
          <img className="w-36" src={LOGO_URL} />
        </Link>
      </div>
      <div className="py-14 text-lg">
        <ul className="flex">
          {/* <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li> */}
          <li className="px-2 hover:font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 hover:font-bold">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-2 hover:font-bold">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-2 hover:font-bold">
            <Link to="/cart">Cart ({totalQuantity} items)</Link>
          </li>

          <li className="px-2 mr-2 hover:font-bold">
            {userInfo ? (
              <>
                <button onClick={handleSignOut}>
                  {userInfo.displayName} (Sign Out)
                </button>
              </>
            ) : (
              <button
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
