import zomatoData from "../utils/zomatoData.json";
import SearchBar from "./SearchBar";
import ZomatoCardContainer from "./ZomatoCardContainer";
import { useState } from "react";

const ZomatoBody = () => {
  const [restaurants, setRestaurants] = useState(zomatoData);

  const [change, setChange] = useState(true);

  return (
    <div className="proj-body">
      <SearchBar />
      <button
        className="filter-btn"
        onClick={() => {
          let filteredData = restaurants.filter(
            (res) => res.info.rating.aggregate_rating >= 4
          );
          if (change) {
            setRestaurants(filteredData);
            // console.log(restaurants);
          } else {
            setRestaurants(zomatoData);
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
          <ZomatoCardContainer
            key={restaurant.info.resId}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default ZomatoBody;
