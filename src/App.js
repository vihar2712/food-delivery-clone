import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ZomatoBody from "./components/ZomatoBody";
import SwiggyBody from "./components/SwiggyBody";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";

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
      <Outlet /> 
      {/* Outlet tag will get replaced by the corresponding children route Component based on the route */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {path: "/restaurants/:id",element:<RestaurantMenu/>}
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);

root.render(<RouterProvider router={router} />);
