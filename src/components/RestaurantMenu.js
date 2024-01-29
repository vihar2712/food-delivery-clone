import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const params = useParams();
  const { id } = params;

  const allInfo = useRestaurantMenu(id);
  if (allInfo===null) return <Shimmer />;

  const { name, areaName, cuisines, costForTwoMessage } =
    allInfo?.cards[0]?.card?.card?.info;

  const { cards } = allInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR;

  return (
    <div className="restaurant">
      <div className="res-info">
        <h1>{name}</h1>
        <p>{cuisines.join(", ")}</p>
        <p>{areaName}</p>
        <p>{costForTwoMessage}</p>
      </div>
      {cards.map((itemObj) => {
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
