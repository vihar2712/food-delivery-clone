// Constructing UI with Live Swiggy API

import { useContext, useEffect, useRef, useState } from "react";
import SwiggyCardContainer, { withPromotedLabel } from "./SwiggyCardContainer";
import { Link, useNavigate } from "react-router-dom";
import { SWIGGY_API_URL, SWIGGY_API_URL_2 } from "../utils/links";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import HomeShimmer from "./Shimmer";
import Login from "./Login";
import { useSelector } from "react-redux";
import Header from "./Header";

const Body = () => {
  // const [restaurants, setRestaurants] = useState(zomatoData);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const refText = useRef(null);
  const [change, setChange] = useState(true);
  const showLoginDisplay = useSelector((store) => store.user?.loginDisplay);
  // console.log(showLoginDisplay);

  // console.log("2");
  // debugger;
  const onlineStatus = useOnlineStatus();
  // debugger;
  // console.log(onlineStatus);
  let allRestaurants = [];

  const PromotedRestaurants = withPromotedLabel(SwiggyCardContainer);

  const fetchData = async () => {
    // const data = await fetch(
    const data = await fetch(SWIGGY_API_URL);
    const jsonData = await data.json();
    // console.log(jsonData);

    allRestaurants = await jsonData?.data?.cards[1]?.card?.card?.gridElements
      ?.infoWithStyle?.restaurants;

    // allRestaurants = await jsonData?.data?.success?.cards[1]?.card?.card
    //   ?.gridElements?.infoWithStyle?.restaurants;

    // allRestaurants = await jsonData?.data?.success?.cards[1]?.gridWidget
    //   ?.gridElements?.infoWithStyle?.restaurants;

    // console.log(allRestaurants);

    setRestaurants(allRestaurants);
    setFilteredRestaurants(allRestaurants);
  };

  useEffect(() => {
    // console.log("useEffect called inside body");
    if (onlineStatus) fetchData();
  }, [onlineStatus]);

  if (onlineStatus === false)
    return <h1>You seem offline. Please check your internet connection</h1>;

  // const user = useContext(UserContext);
  // console.log(user);

  // const { loggedInUser, setUserInfo, loginTime } = user;
  // console.log(restaurants);

  return restaurants.length === 0 ? (
    <HomeShimmer />
  ) : (
    <div className="bg-gray-100">
      <div className="flex p-4 justify-center text-lg">
        <input
          type="text"
          id="search"
          ref={refText}
          data-testid="searchInput"
          className="border border-solid border-black p-2 rounded-md mx-2"
          placeholder="search for restaurants...."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            const filteredRes = restaurants.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(refText.current.value.toLowerCase());
            });
            setFilteredRestaurants(filteredRes);
          }}
        />
        <button className="px-4 bg-white rounded-md ml-1 mr-3 hover:shadow-lg">
          Search
        </button>
        <button
          className=" bg-white rounded-md px-4 hover:shadow-lg"
          onClick={() => {
            let filteredData = filteredRestaurants.filter(
              // (res) => res.info.rating.aggregate_rating >= 4
              (res) => res.info.avgRating >= 4
            );

            if (change) {
              setFilteredRestaurants(filteredData);
              // console.log(restaurants);
            } else {
              setRestaurants(allRestaurants);
              fetchData();
              // console.log(restaurants);
            }
            setChange(!change);
            // console.log(change);
          }}
        >
          {change ? "Top Rated" : "Top Rated ❌"}
        </button>
        {/* <input
          type="text"
          className="border border-solid border-black mx-2"
          value={loggedInUser}
          onChange={(event) => {
            setUserInfo({ name: event.target.value, dob: loginTime });
          }}
        /> */}
      </div>

      <div className="grid grid-cols-12 mx-10 sm:mx-16 md:mx-20 lg:mx-24 xl:mx-32">
        {filteredRestaurants.map((restaurant) => {
          const { id, promoted } = restaurant.info;
          return (
            <div
              key={id}
              onClick={() => navigate("/restaurants/" + id)}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 hover:scale-95 hover:cursor-pointer"
            >
              {promoted ? (
                <PromotedRestaurants resData={restaurant} />
              ) : (
                <SwiggyCardContainer resData={restaurant} />
              )}
            </div>
          );
        })}
      </div>
      {showLoginDisplay && <Login />}
    </div>
  );
};

export default Body;
