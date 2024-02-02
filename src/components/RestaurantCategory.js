import ItemList from "./ItemList";

const RestaurantCategory = ({
  category,
  showItems,
  showIndexFunction,
  collapseItems,
}) => {
  const { title, itemCards } = category?.card?.card;

  const handleClick = () => {
    showIndexFunction();
    showItems && collapseItems();
  };
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-50 my-4 mx-auto p-4  sm:w-9/12 md:w-6/12 shadow-lg cursor-pointer">
        <div className="flex justify-between" onClick={handleClick}>
          <span className="font-bold text-xl">
            {title} ({itemCards.length})
          </span>
          <span className="text-md"> {showItems ? "▲" : "▼"}</span>
        </div>
        {/* items */}
        <div>
          {itemCards.map(
            (item) =>
              showItems && <ItemList data={item} key={item?.card?.info?.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
