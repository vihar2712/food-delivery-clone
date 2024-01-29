import { useState } from "react";
import { LOGO_URL } from "../utils/links";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  // console.log("rendered");
  // console.log(onlineStatus + "----");

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={LOGO_URL} />
        </Link>
      </div>
      <div className="nav-container">
        <ul className="nav-items">
          <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <a href="/about">Cart</a>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
