import { useDispatch, useSelector } from "react-redux";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { SWIGGY_IMAGE_URL } from "../utils/links";
import HomeShimmer from "./Shimmer";
import { clearCart, subtractPriceInCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartR.items);
  const cartTotalPrice = useSelector((store) => store.cartR.cartTotalPrice);
  const restaurantId = useSelector((store) => store.cartR.resId);
  const allInfo = useRestaurantMenu(restaurantId);

  const handleClear = () => {
    dispatch(clearCart());
    dispatch(subtractPriceInCart(cartTotalPrice));
  };

  if (cartTotalPrice === 0) return <EmptyCart />;
  if (!allInfo) return <HomeShimmer />;

  const { name, areaName, cloudinaryImageId } =
    allInfo?.cards[2]?.card?.card?.info; //0,2

  return (
    <div className="bg-gray-200 pt-4 h-full">
      <div className="w-11/12 sm:w-9/12 md:w-6/12 relative left-0 mx-auto sm:mx-0 sm:left-2 md:left-10  bg-white rounded-sm">
        <div className="flex p-2">
          <img
            src={SWIGGY_IMAGE_URL + cloudinaryImageId}
            className="w-16 rounded-md mr-2"
          />
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <h1>{areaName}</h1>
          </div>
        </div>
        <div className="h-[400px] overflow-y-auto">
          {cartItems.map((item) => (
            <CartItemsList data={item} key={item.itemInfo.id} />
          ))}
        </div>
        <div className="m-2 p-2 flex justify-end">
          <h1 className="text- font-bold">
            Total : ₹ {cartTotalPrice.toFixed(2)}
          </h1>
        </div>
        <div className="flex justify-center pb-2">
          <button
            className="bg-green-600 font-semibold text-white border border-black p-1 hover:shadow-lg"
            onClick={() => handleClear()}
          >
            CLEAR CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
