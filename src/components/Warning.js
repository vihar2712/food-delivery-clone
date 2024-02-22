import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  setWarning,
  subtractPriceInCart,
} from "../utils/cartSlice";

// component for warning the user to discard the current cart and create a new one for the new restaurant.
const Warning = () => {
  const dispatch = useDispatch();
  const cartTotalPrice = useSelector((store) => store.cartR?.cartTotalPrice);
  return (
    <div className=" sm:w-9/12 md:w-6/12 mx-auto pt-14 ">
      <div className="bg-white  border border-black fixed bottom-20 mx-auto px-2 py-3 rounded-tl-sm rounded-tr-sm w-full sm:w-9/12 md:w-6/12 shadow-lg  text-lg">
        <h1 className="font-bold">Items already in cart</h1>
        <p className="text-gray-700">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex font-semibold">
          <button
            className="w-6/12 border border-green-600 rounded-sm p-1 mx-1 hover:shadow-lg"
            onClick={() => {
              dispatch(setWarning(false));
            }}
          >
            NO
          </button>
          <button
            className="w-6/12 border bg-green-600 text-white rounded-sm p-1 mx-1 hover:shadow-lg"
            onClick={() => {
              //   dispatch(clearCart());
              dispatch(subtractPriceInCart(cartTotalPrice));
              dispatch(setWarning(false));
              dispatch(clearCart());
            }}
          >
            YES, START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
