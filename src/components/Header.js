import { useState } from "react";
import { LOGO_URL } from "../utils/links";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("rendered");

  return (
    <div className="header">
      <div className="logo">
        <img className="logo-img" src={LOGO_URL} />
      </div>
      <div className="nav-container">
        <ul className="nav-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Cart</a>
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
