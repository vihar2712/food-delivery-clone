import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import Toast from "./Toast";

const RestaurantCategory = ({
  category,
  showItems,
  showIndexFunction,
  collapseItems,
}) => {
  const { title, itemCards, categories } = category?.card?.card;
  // console.log(itemCards, categories);

  const handleClick = () => {
    showIndexFunction();
    showItems && collapseItems();
  };
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-50 my-4 mx-auto p-4  sm:w-9/12 xl:w-6/12 shadow-lg cursor-pointer">
        <div className="flex justify-between" onClick={handleClick}>
          <span className="font-bold text-xl">
            {title} ({itemCards?.length || categories[0]?.itemCards?.length})
          </span>
          <span className="text-md"> {showItems ? "▲" : "▼"}</span>
        </div>
        {/* items */}
        <div>
          {(itemCards || categories[0]?.itemCards).map((item) => {
            return (
              showItems && (
                <ItemList data={item.card.info} key={item?.card?.info?.id} />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
