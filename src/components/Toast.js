import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Toast = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cartR?.items);
  // console.log(cartItems);
  let totalQuantity = cartItems?.reduce(
    (newLength, item) => newLength + item.quantity,
    0
  );
  return (
    <div className=" sm:w-9/12 md:w-6/12 mx-auto pt-14">
      <div className="bg-green-600 text-white font-semibold fixed bottom-0 mx-auto px-2 py-3 rounded-tl-sm rounded-tr-sm w-full sm:w-9/12 md:w-6/12 shadow-lg flex justify-between text-lg">
        <h1 className="mx-3">{totalQuantity} items added</h1>
        <button
          onClick={() => navigate("/cart")}
          className="hover:underline mx-3"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default Toast;
