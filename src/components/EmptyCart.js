import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="h-full bg-gray-200">
      <div className=" p-4 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Your Cart is empty!! </h1>
        <Link
          to="/"
          className="bg-green-600 p-2 mt-2 text-white font-semibold hover:text-gray-200 text-lg"
        >
          See Restaurants near you{" "}
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
