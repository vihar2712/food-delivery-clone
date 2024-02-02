import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const clearCartItems = () => {
    dispatch(clearCart());
  };
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div>
      <div className="w-6/12 mx-auto text-center">
        <h1 className="mt-4 text-3xl font-bold ">Cart</h1>
        <button
          onClick={clearCartItems}
          className="bg-black mt-2  text-white p-2 rounded-md"
        >
          Clear Cart
        </button>
      </div>
      <div className="w-6/12 mx-auto">
        {cartItems.map((item) => {
          return <ItemList data={item} key={item.card.info.id} />;
        })}
      </div>
    </div>
  );
};

export default Cart;
