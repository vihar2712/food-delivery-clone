// Constructing UI with Live Swiggy API

import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SwiggyCardContainer, { withPromotedLabel } from "./SwiggyCardContainer";
import { Link } from "react-router-dom";
import { SWIGGY_API_URL, SWIGGY_API_URL_2 } from "../utils/links";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // const [restaurants, setRestaurants] = useState(zomatoData);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [change, setChange] = useState(true);

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
    allRestaurants = await jsonData?.data?.success?.cards[1]?.card?.card
      ?.gridElements?.infoWithStyle?.restaurants;

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

  const user = useContext(UserContext);
  // console.log(user);

  const { loggedInUser, setUserInfo, loginTime } = user;
  // console.log(restaurants);

  return restaurants.length === 0 ? (
    <Shimmer  />
  ) : (
    <div>
      <div className="flex p-4">
        <input
          type="text"
          id="search"
          data-testid="searchInput"
          className="border border-solid border-black"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <button
          className="px-4 bg-gray-100 rounded-md ml-1 mr-3"
          onClick={() => {
            const filteredRes = restaurants.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setFilteredRestaurants(filteredRes);
          }}
        >
          Search
        </button>
        <button
          className=" bg-gray-100 rounded-md px-4"
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
        <input
          type="text"
          className="border border-solid border-black mx-2"
          value={loggedInUser}
          onChange={(event) => {
            setUserInfo({ name: event.target.value, dob: loginTime });
          }}
        />
      </div>

      <div className="flex flex-wrap justify-start ml-16">
        {filteredRestaurants.map((restaurant) => {
          const { id, promoted } = restaurant.info;
          return (
            <Link
              key={id}
              to={"/restaurants/" + id}
              className="w-52 bg-gray-100 rounded-md m-3  hover:bg-gray-200 hover:scale-95"
            >
              {promoted ? (
                <PromotedRestaurants resData={restaurant} />
              ) : (
                <SwiggyCardContainer resData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
