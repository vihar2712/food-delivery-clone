import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const clearCartItems = () => {
    dispatch(clearCart());
  };
  const cartItems = useSelector((store) => store.cartR.items);
  const cartTotalPrice = useSelector((store) => store.cartR.cartTotalPrice);
  console.log(cartItems);

  if (cartTotalPrice === 0) return <EmptyCart />;

  return (
    <div className="bg-gray-200 pt-4 h-full">
      {/* <div className="w-6/12 text-center">
        <button
          onClick={clearCartItems}
          className="bg-black mt-2  text-white p-2 rounded-md"
        >
          Clear Cart
        </button>
      </div> */}
      <div className="w-11/12 sm:w-9/12 md:w-6/12 relative left-2 md:left-10 top-5 md:top-20 bg-white rounded-sm">
        {cartItems.map((item) => (
          <CartItemsList data={item} key={item.itemInfo.id} />
        ))}
        <div className="m-2 p-2 flex justify-end">
          {/* <Link to="/">Add more items:</Link> */}
          <h1 className="text- font-bold">
            Total : ₹ {cartTotalPrice.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Cart;
