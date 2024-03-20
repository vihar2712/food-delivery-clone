// Constructing UI with Live Swiggy API

import { useContext, useEffect, useRef, useState } from "react";
import SwiggyCardContainer, { withPromotedLabel } from "./SwiggyCardContainer";
import { Link, useNavigate } from "react-router-dom";
import {
  SWIGGY_API_URL,
  SWIGGY_API_URL_2,
  SWIGGY_API_URL_3,
} from "../utils/links";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import HomeShimmer from "./Shimmer";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import { filterCuisineArr } from "../utils/filterSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  let [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  let [filteredCuisines, setFilteredCuisines] = useState([]);
  const selectedCuisines = useSelector((store) => store.filter?.cuisineArr);
  const refText = useRef(null);
  const [change, setChange] = useState(true);
  const showLoginDisplay = useSelector((store) => store.user?.loginDisplay);
  // console.log(showLoginDisplay);
  console.log(filteredRestaurants);

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

  // console.log(filteredCuisines);

  if (filteredCuisines.length > 0) {
    let filteredRestaurantsByCuisines = [];
    filteredRestaurants = restaurants;
    filteredCuisines.map((cuisine) => {
      const intermediate = filteredRestaurants.filter((res) =>
        res.info.cuisines.includes(cuisine)
      );
      intermediate.map((res) => filteredRestaurantsByCuisines.push(res));
    });
    filteredRestaurantsByCuisines = filteredRestaurantsByCuisines.filter(
      (item, index) => filteredRestaurantsByCuisines.indexOf(item) === index
    );
    // console.log(filteredRestaurantsByCuisines);

    setFilteredCuisines([]);
    // console.log(filteredCuisines);

    setFilteredRestaurants(filteredRestaurantsByCuisines);
  }
  // const user = useContext(UserContext);
  // console.log(user);

  // const { loggedInUser, setUserInfo, loginTime } = user;
  // console.log(restaurants);

  return restaurants && restaurants.length === 0 ? (
    <HomeShimmer />
  ) : (
    <div className="bg-gray-100">
      <div className="flex flex-col sm:flex-row p-4 justify-center text-lg items-center">
        <div className="">
          <input
            type="text"
            id="search"
            ref={refText}
            data-testid="searchInput"
            className="border border-solid border-black p-2 rounded-md mx-2"
            placeholder="search for restaurants,cuisines,areas......"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              const filteredRes = restaurants.filter((res) => {
                return (
                  res.info.name
                    .toLowerCase()
                    .includes(refText.current.value.trim().toLowerCase()) ||
                  res.info.areaName
                    .toLowerCase()
                    .includes(refText.current.value.trim().toLowerCase()) ||
                  res.info.cuisines
                    .join(" ")
                    .toLowerCase()
                    .includes(refText.current.value.trim().toLowerCase())
                );
              });
              setFilteredRestaurants(filteredRes);
            }}
          />
        </div>
        <div className="mt-2 sm:mt-0">
          <button className="px-4 bg-white rounded-md ml-1 hover:shadow-lg border border-gray-300">
            Search
          </button>
          <button
            className=" bg-white rounded-md px-4 hover:shadow-lg mx-3 border border-gray-300"
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
                dispatch(filterCuisineArr([]));
                // console.log(restaurants);
              }
              setChange(!change);
              // console.log(change);
            }}
          >
            {change ? "Top Rated" : "❌ Top Rated"}
          </button>
          <button
            className="px-4 bg-white rounded-md ml-1 hover:shadow-lg border border-gray-300"
            onClick={() => setShowFilter(true)}
          >
            {selectedCuisines.length > 0
              ? "❌ Filter by cuisine"
              : "Filter by cuisine"}
          </button>
        </div>
        {/* <input
          type="text"
          className="border border-solid border-black mx-2"
          value={loggedInUser}
          onChange={(event) => {
            setUserInfo({ name: event.target.value, dob: loginTime });
          }}
        /> */}
      </div>

      {filteredRestaurants.length > 0 ? (
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
      ) : (
        <div>
          <h1 className="text-center font-bold">No restaurants found....</h1>
        </div>
      )}
      {showLoginDisplay && <Login />}
      {showFilter && (
        <Filter
          showFilterFn={setShowFilter}
          filteredCuisineFn={(data) => setFilteredCuisines(data)}
          resetFn={() => setFilteredRestaurants(restaurants)}
        />
      )}
    </div>
  );
};

export default Body;
