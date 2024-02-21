const handleAddItem = () => {
  const found = cart.find((element) => Object.keys(element)[0] === id);
  console.log(found);

  if (!found) {
    console.log("cart empty");

    dispatch(
      addItem({
        [id]: 1,
      })
    );
  }
  cart.map((item) => {
    console.log(item);
    let itemId = Object.keys(item)[0];
    let quantity = Object.values(item)[0];
    console.log(itemId, quantity);

    // console.log(quantity, itemInfo, data.card.info.id);
    console.log(data.card.info.id, itemId);

    if (data.card.info.id === itemId) {
      console.log("equal");
      quantity += 1;
      dispatch(removeItem(itemId));
      dispatch(
        addItem({
          [id]: quantity,
        })
      );
    }
  });
};
const handleRemoveItem = () => {
  cart.map((item) => {
    console.log(item);
    let itemId = Object.keys(item)[0];
    let quantity = Object.values(item)[0];
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
            [id]: quantity,
          })
        );
      }
    }
  });
};
