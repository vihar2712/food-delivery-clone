import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import HomeShimmer from "./Shimmer";
import { ALT_IMAGE_URL, SWIGGY_IMAGE_URL } from "../utils/links";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import Warning from "./Warning";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const params = useParams();
  const { id } = params;

  const cart = useSelector((store) => store.cartR?.items);
  const warning = useSelector((store) => store.cartR?.warning);

  const allInfo = useRestaurantMenu(id);
  if (allInfo === null) return <HomeShimmer />;

  const {
    name,
    areaName,
    cuisines,
    costForTwoMessage,
    sla,
    cloudinaryImageId,
  } = allInfo?.cards[2]?.card?.card?.info;

  let { cards } = allInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  cards = cards.filter(
    (item) =>
      item?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      item?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );
  // console.log(cards);

  return (
    <div className="bg-gray-100">
      <div className="m-4 flex flex-col p-2 border-dotted border-b-2 w-full sm:w-9/12 md:w-6/12 mx-auto text-left">
        <div className="flex justify-around md:justify-between ">
          <div>
            <h1 className="font-bold text-2xl">{name}</h1>
            <p>{cuisines.join(", ")}</p>
            <p>{areaName}</p>
            <p>{costForTwoMessage}</p>
            {/* <p>ETA: {sla.slaString.toLowerCase()}</p> */}
          </div>
          <img
            src={SWIGGY_IMAGE_URL + cloudinaryImageId}
            className="w-28 sm:w-32 md:w-36 rounded-lg"
            alt={ALT_IMAGE_URL}
          />
        </div>
      </div>
      {cards.map((itemObj, index) => {
        // console.log(itemObj);

        const { itemCards, title, categories } = itemObj?.card?.card;
        // console.log(itemCards);
        if (itemCards || categories) {
          return (
            <RestaurantCategory
              category={itemObj}
              key={title}
              showIndexFunction={() => setShowIndex(index)}
              showItems={index === showIndex ? true : false}
              collapseItems={() => setShowIndex(null)}
            />
          );
        }
      })}
      {cart.length > 0 && <Toast />}
      {warning && <Warning />}
    </div>
  );
};

export default RestaurantMenu;
