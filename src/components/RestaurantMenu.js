import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0747676&lng=72.535598&restaurantId=" +
        id +
        "&isMenuUx4=true&submitAction=ENTER"
    );
    const jsonData = await data.json();
    console.log(jsonData);

    const info = jsonData?.data?.cards[2]?.card?.card?.info;
    let menu =
      jsonData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards;
    // console.log(menu[0]);
    // console.log(menu);
    // console.log(menu);
    setResMenu(menu);
    setResInfo(info);
  };
  if (resInfo === null) return <Shimmer />;

  const { name, areaName, cuisines, costForTwoMessage } = resInfo;

  return (
    <div className="restaurant">
      <div className="res-info">
        <h1>{name}</h1>
        <p>{cuisines.join(", ")}</p>
        <p>{areaName}</p>
        <p>{costForTwoMessage}</p>
      </div>
      {resMenu.map((itemObj) => {
        // console.log(itemObj);

        const { title, itemCards } = itemObj?.card?.card;
        // console.log(itemCards);
        if (itemCards) {
          return (
            <div className="food-category" key={title}>
              <h2>{title}</h2>
              {itemCards?.map((item) => {
                const { name, price, id, defaultPrice } = item?.card?.info;
                return (
                  <div className="food-item" key={id}>
                    <h3>{name}</h3>
                    <p>Rs. {price / 100 || defaultPrice / 100}</p>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default RestaurantMenu;
