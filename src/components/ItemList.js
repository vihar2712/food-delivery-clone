import { useState } from "react";
import { ALT_IMAGE_URL, SWIGGY_IMAGE_URL } from "../utils/links";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ data }) => {
  const { name, price, defaultPrice, description, imageId, id } =
    data?.card?.info;
  let i = 0;
  const [counter, setCounter] = useState(0);
  const cart = useSelector((store) => store.cartR?.items);
  // console.log(cart);

  const dispatch = useDispatch();
  const handleAddItem = () => {
    const found = cart.find((element) => element.itemId === id);
    console.log(found);

    if (!found) {
      console.log("cart empty");

      dispatch(
        addItem({
          itemId: id,
          quantity: 1,
        })
      );
    }
    cart.map((item) => {
      console.log(item);
      let { itemId, quantity } = item;
      console.log(itemId, quantity);

      // console.log(quantity, itemInfo, data.card.info.id);
      console.log(data.card.info.id, itemId);

      if (data.card.info.id === itemId) {
        console.log("equal");
        quantity += 1;
        dispatch(removeItem(itemId));
        dispatch(
          addItem({
            itemId,
            quantity,
          })
        );
      }
    });
  };
  const handleRemoveItem = () => {
    cart.map((item) => {
      console.log(item);
      let { itemId, quantity } = item;
      console.log(itemId, quantity);

      // console.log(quantity, itemInfo, data.card.info.id);
      console.log(data.card.info.id, itemId);

      if (data.card.info.id === itemId) {
        console.log("equal");
        if (quantity === 1) {
          dispatch(removeItem(itemId));
        } else {
          quantity -= 1;
          dispatch(removeItem(itemId));
          dispatch(
            addItem({
              itemId,
              quantity,
            })
          );
        }
      }
    });
  };
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div
      className="border-b-2 p-4 flex justify-between"
      data-testid="foodItems"
    >
      <div className="w-9/12 px-2">
        <span className="text-lg">{name}</span>
        <p> ₹ {price / 100 || defaultPrice / 100}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="w-3/12 relative">
        <img
          src={SWIGGY_IMAGE_URL + imageId}
          className="rounded-lg h-[150px] w-full"
        />
        {counter == 0 ? (
          <button
            className="bg-white shadow-md rounded-md px-3 py-2 absolute -bottom-2 left-1/3 font-bold hover:shadow-lg"
            onClick={() => {
              handleAddItem();
              incrementCounter();
            }}
          >
            Add
          </button>
        ) : (
          <div className="bg-white shadow-md rounded-md w-6/12 py-2 absolute -bottom-2 left-1/4 font-bold hover:shadow-lg flex justify-around text-lg">
            <div
              onClick={() => {
                handleRemoveItem();
                decrementCounter();
              }}
              className="text-xl hover:scale-90"
            >
              {" "}
              -{" "}
            </div>
            <div>{counter}</div>
            <div
              onClick={() => {
                handleAddItem();
                incrementCounter();
              }}
              className="text-xl hover:scale-90 "
            >
              {" "}
              +{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
