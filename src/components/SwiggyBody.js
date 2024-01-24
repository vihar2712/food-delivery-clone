import swiggyData from "../utils/swiggyData.json";
import SearchBar from "./SearchBar";
import SwiggyCardContainer from "./SwiggyCardContainer";
import { useState } from "react";

const SwiggyBody = () => {
  const [restaurants, setRestaurants] = useState(swiggyData);

  const [change, setChange] = useState(true);

  return (
    <div className="proj-body">
      <button
        className="filter-btn"
        onClick={() => {
          let filteredData = restaurants.filter(
            (res) => res.info.avgRating >= 4
          );
          if (change) {
            setRestaurants(filteredData);
            // console.log(restaurants);
          } else {
            setRestaurants(swiggyData);
            // console.log(restaurants);
          }
          setChange(!change);
          // console.log(change);
        }}
      >
        {change ? "Top Rated" : "Top Rated ❌"}
      </button>
      <div className="res-container">
        {restaurants.map((restaurant) => (
          <SwiggyCardContainer key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SwiggyBody;
