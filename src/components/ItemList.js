import { useState } from "react";
import { SWIGGY_IMAGE_URL } from "../utils/links";

const ItemList = ({ data }) => {
  const { name, price, defaultPrice, description, imageId } = data?.card?.info;
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    setCounter(counter - 1);
  };
  return (
    <div className="border-b-2 p-4 flex justify-between">
      <div className="w-9/12 px-2">
        <span className="text-lg">{name}</span>
        <p> ₹ {price / 100 || defaultPrice / 100}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="w-3/12 relative">
        <img src={SWIGGY_IMAGE_URL + imageId} className="rounded-lg h-full" />
        {counter == 0 ? (
          <button
            className="bg-white shadow-md rounded-md px-3 py-2 absolute -bottom-2 left-1/3 font-bold hover:shadow-lg"
            onClick={incrementCounter}
          >
            Add
          </button>
        ) : (
          <div className="bg-white shadow-md rounded-md w-6/12 py-2 absolute -bottom-2 left-1/4 font-bold hover:shadow-lg flex justify-around text-lg">
            <div onClick={decrementCounter} className="text-xl hover:scale-95"> - </div>
            <div>{counter}</div>
            <dov onClick={incrementCounter} className="text-xl hover:scale-95 "> + </dov>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
