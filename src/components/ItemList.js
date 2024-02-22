import { useState } from "react";
import { ALT_IMAGE_URL, SWIGGY_IMAGE_URL } from "../utils/links";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addPriceInCart,
  removeItem,
  subtractPriceInCart,
} from "../utils/cartSlice";

const ItemList = ({ data }) => {
  const dispatch = useDispatch();
  const { name, price, defaultPrice, description, imageId, id } = data;
  const totalItemPrice = (price || defaultPrice) / 100;
  const [counter, setCounter] = useState(0);
  const cart = useSelector((store) => store.cartR?.items);
  const found = cart.find((element) => element.itemInfo.id === id);
  let itemQuantity = found ? found.quantity : 0;
  // console.log(itemQuantity);

  // let itemQuantity = found.quantity ? found.quantity : 0;
  const handleAddItem = () => {
    const found = cart.find((element) => element.itemInfo.id === id);
    if (!found) {
      console.log("cart empty");
      dispatch(addPriceInCart(totalItemPrice));
      // console.log(totalItemPrice);
      dispatch(
        addItem({
          itemInfo: data,
          quantity: 1,
        })
      );
    }
    cart.map((item) => {
      // console.log(item);
      let { itemInfo, quantity } = item;
      // console.log(itemId, quantity);
      // console.log(quantity, itemInfo, data.card.info.id);
      // console.log(data.card.info.id, itemId);

      if (id === itemInfo.id) {
        // console.log("equal");
        dispatch(addPriceInCart(totalItemPrice));
        console.log(totalItemPrice);
        quantity += 1;

        dispatch(removeItem(id));

        dispatch(
          addItem({
            itemInfo: data,
            quantity,
          })
        );
      }
    });
  };
  const handleRemoveItem = () => {
    cart.map((item) => {
      // console.log(item);
      let { itemInfo, quantity } = item;
      // console.log(itemId, quantity);

      // console.log(quantity, itemInfo, data.card.info.id);
      // console.log(data.card.info.id, itemId);

      if (id === itemInfo.id) {
        dispatch(subtractPriceInCart(totalItemPrice));
        console.log("equal");
        if (quantity === 1) {
          dispatch(removeItem(id));
        } else {
          quantity -= 1;
          dispatch(removeItem(id));
          dispatch(
            addItem({
              itemInfo: data,
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
        {itemQuantity === 0 ? (
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
            <div>{itemQuantity}</div>
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
