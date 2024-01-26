// Constructing UI with Live Swiggy API

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SwiggyCardContainer from "./SwiggyCardContainer";
import { Link } from "react-router-dom";

const Body = () => {
  // const [restaurants, setRestaurants] = useState(zomatoData);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [change, setChange] = useState(true);

  console.log("2");

  let allRestaurants = [];

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/api/seo/getListing?lat=23.144477092557135&lng=72.59576804274302"
    );
    // const data = await fetch(
    //   "https://www.swiggy.com/api/seo/getListing?lat=23.144477092557135&lng=72.59576804274302",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: {
    //       isFiltered: false,
    //       facets: {},
    //       seoParams: {
    //         apiName: "CityPage",
    //         brandId: "",
    //         seoUrl: "www.swiggy.com/city/ahmedabad/veg-restaurants",
    //         pageType: "CITY_PURE_VEG_PAGE",
    //       },
    //       widgetOffset: {
    //         NewListingView_category_bar_chicletranking_TwoRows: "",
    //         NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
    //         Restaurant_Group_WebView_SEO_PB_Theme: "",
    //         collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "41",
    //         inlineFacetFilter: "",
    //         restaurantCountWidget: "",
    //       },
    //       nextOffset: "CJY7ELQ4KICg9vn0sJCIcjDUEDgD",
    //     },
    //   }
    // );
    const jsonData = await data.json();
    allRestaurants = await jsonData?.data?.success?.cards[1]?.card?.card
      ?.gridElements?.infoWithStyle?.restaurants;

    setRestaurants(allRestaurants);
    setFilteredRestaurants(allRestaurants);
  };
  const changeFn = (changeValue, restaurant) => {};
  useEffect(() => {
    // console.log("useEffect called");
    fetchData();
  }, []);
  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="proj-body">
      <div className="search-container">
        {" "}
        <input
          type="text"
          id="search"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <button
          className="search-btn"
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
      </div>
      <button
        className="filter-btn"
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
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="res-link"
          >
            <SwiggyCardContainer resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
