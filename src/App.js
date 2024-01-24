import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

/*
-Header
  -logo
  -navigation items
    -home
    -about us
    -contact us
    -cart
-Body
  -search bar
  -card container
    -card items
      -restaurant name
      -cuisine
      -price for two
      -ratings
      -ETA
-Footer
  -company links
  -T&C
  -About us
  -Copyright
*/

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);