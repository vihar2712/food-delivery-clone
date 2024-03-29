import { useState } from "react";
import { ALT_IMAGE_URL, SWIGGY_IMAGE_URL } from "../utils/links";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addPriceInCart,
  addResId,
  removeItem,
  setWarning,
  subtractPriceInCart,
} from "../utils/cartSlice";
import { useParams } from "react-router-dom";

const ItemList = ({ data }) => {
  const resId = useParams().id;
  const dispatch = useDispatch();
  const { name, price, defaultPrice, description, imageId, id } = data;
  const totalItemPrice = (price || defaultPrice) / 100 || 0;

  const cart = useSelector((store) => store.cartR?.items);
  const found = cart.find((element) => element.itemInfo.id === id);
  let itemQuantity = found ? found.quantity : 0;
  const storeResId = useSelector((store) => store.cartR?.resId);

  // let itemQuantity = found.quantity ? found.quantity : 0;
  const handleAddItem = () => {
    if (resId === storeResId || cart.length === 0) {
      dispatch(addResId(resId));
      const found = cart.find((element) => element.itemInfo.id === id);
      if (!found) {
        // console.log("cart empty");
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
    } else {
      dispatch(setWarning(true));
    }
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
        // console.log("equal");
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
  return (
    <div
      className="border-b-2 p-4 flex justify-between"
      data-testid="foodItems"
    >
      <div className="w-9/12 px-2">
        <span className="text-md sm:text-lg font-semibold text-gray-700">
          {name}
        </span>
        <p className="text-sm sm:text-md">
          {" "}
          ₹ {price / 100 || defaultPrice / 100}
        </p>
        {description && (
          <p className="text-xs sm:text-sm text-gray-600">{description}</p>
        )}
      </div>
      <div className="w-3/12 relative h-fit">
        <img
          src={SWIGGY_IMAGE_URL + imageId}
          className="rounded-lg h-[90px] sm:h-[150px] w-full"
        />
        {itemQuantity === 0 ? (
          <button
            className="bg-white shadow-md rounded-md py-1 w-11/12 md:w-6/12 md:left-1/4 absolute -bottom-2 left-0.5 sm:left-1.5 font-bold hover:shadow-lg"
            onClick={() => {
              handleAddItem();
            }}
          >
            Add
          </button>
        ) : (
          <div className="bg-white shadow-md rounded-md w-9/12 sm:w-6/12 px-1 absolute -bottom-2 left-2 sm:left-1/4 font-bold hover:shadow-lg flex justify-around text-md">
            <div
              onClick={() => {
                handleRemoveItem();
              }}
              className="text-lg hover:scale-90"
            >
              {" "}
              -{" "}
            </div>
            <div>{itemQuantity}</div>
            <div
              onClick={() => {
                handleAddItem();
              }}
              className="text-lg hover:scale-90"
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
