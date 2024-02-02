import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/links";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  // console.log("rendered");
  // console.log(onlineStatus + "----");

  const userContext = useContext(UserContext);
  // console.log(userContext);

  const { loggedInUser, loginTime } = userContext;

  // Selector is used to subscribe to the appStore

  const cartItems = useSelector((store) => store.cartR.items);
  // console.log(cartItems);

  return (
    <div className="flex justify-between bg-green-100 shadow-md">
      <div className="logo">
        <Link to="/">
          <img className="w-36" src={LOGO_URL} />
        </Link>
      </div>
      <div className="py-14 text-lg">
        <ul className="flex">
          <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
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
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-2 hover:font-bold">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
          <li className="px-2 hover:font-bold">
            <button
              className="login-btn"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <li className="px-2 hover:font-bold">
            {loggedInUser} at {loginTime}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
