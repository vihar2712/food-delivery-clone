import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addPriceInCart,
  removeItem,
  subtractPriceInCart,
} from "../utils/cartSlice";

const CartItemsList = ({ data }) => {
  const dispatch = useDispatch();
  const { name, price, defaultPrice, id } = data.itemInfo;
  const cart = useSelector((store) => store.cartR?.items);
  const totalItemPrice = ((price || defaultPrice) * data.quantity) / 100;
  //   console.log(totalItemPrice);

  //   console.log(cart);
  const handleAddItem = () => {
    cart.map((item) => {
      let { itemInfo, quantity } = item;

      // console.log(quantity, itemInfo, data.card.info.id);
      // console.log(data.card.info.id, itemId);

      if (id === itemInfo.id) {
        // console.log("equal");
        const totalItemPrice = (price || defaultPrice) / 100;
        // console.log(totalItemPrice);
        dispatch(addPriceInCart(totalItemPrice));
        quantity += 1;
        dispatch(removeItem(id));
        dispatch(
          addItem({
            itemInfo: data.itemInfo,
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
        const totalItemPrice = (price || defaultPrice) / 100;
        dispatch(subtractPriceInCart(totalItemPrice));
        // console.log("equal");
        if (quantity === 1) {
          dispatch(removeItem(id));
        } else {
          quantity -= 1;
          dispatch(removeItem(id));
          dispatch(
            addItem({
              itemInfo: data.itemInfo,
              quantity,
            })
          );
        }
      }
    });
  };

  return (
    <div
      className="border-b-2 p-2 md:p-4 flex justify-between items-center"
      data-testid="foodItems"
    >
      <div className="w-6/12 md:px-2">
        <span className="text-md">{name}</span>
        <p> ₹ {price / 100 || defaultPrice / 100}</p>
      </div>
      <div className="w-3/12 relative">
        <div className="bg-white shadow-md rounded-md w-11/12 sm:w-9/12 md:w-6/12 py-2 absolute -bottom-4 left-1/4 font-bold hover:shadow-lg flex justify-around text-lg">
          <div
            onClick={() => {
              handleRemoveItem();
            }}
            className="text-xl hover:scale-90 cursor-pointer"
          >
            {" "}
            -{" "}
          </div>
          <div>{data.quantity}</div>
          <div
            onClick={() => {
              handleAddItem();
            }}
            className="text-xl hover:scale-90 cursor-pointer"
          >
            {" "}
            +{" "}
          </div>
        </div>
      </div>
      <div className=" md:w-3/12 relative text-center text-md">
        <h1>₹ {totalItemPrice}</h1>
      </div>
    </div>
  );
};

export default CartItemsList;
