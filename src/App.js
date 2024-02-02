import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ZomatoBody from "./components/ZomatoBody";
import SwiggyBody from "./components/SwiggyBody";
import Body from "./components/Body";
// import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// import Shimmer from "./components/Shimmer";

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

const Grocery = lazy(() => import("./components/Grocery"));

const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    // calling API to get the user name
    const data = {
      name: " Vihar Shah",
      dob: 121171,
    };
    setUserInfo(data);
  }, []);
  return (
    <div>
      <Provider store={appStore}>
        <UserContext.Provider
          value={{
            loggedInUser: userInfo.name,
            loginTime: userInfo.dob,
            setUserInfo,
          }}
        >
          <Header />
          <Outlet />
          {/* Outlet tag will get replaced by the corresponding children route Component based on the route */}
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
      },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurants/:id", element: <RestaurantMenu /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/cart", element: <Cart /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);

root.render(<RouterProvider router={router} />);
