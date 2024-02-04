import RestaurantMenu from "../components/RestaurantMenu";
import { fireEvent, render, screen } from "@testing-library/react";
import MOCK_RES_MENU from "../mocks/mockResMenu.json";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Header from "../components/Header";
import Cart from "../components/Cart";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_RES_MENU);
    },
  });
});

test("should load restaurant menu component ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordianHeader = screen.getByText("Pizzas (5)");
  fireEvent.click(accordianHeader);

  const items = screen.getAllByTestId("foodItems");

  //   console.log(items.length);

  expect(items.length).toBe(5);
});

test("should update cart page after adding 2 items ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordianHeader = screen.getByText("Pizzas (5)");
  fireEvent.click(accordianHeader);

  const addBtns = screen.getAllByRole("button", { name: "Add" });
  console.log(addBtns.length);

  fireEvent.click(addBtns[0]);
  fireEvent.click(addBtns[1]);

  const cartItems = screen.getByText("Cart (2 items)");

  expect(cartItems).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(7);
});

test("should update cart after subtracting the added food items", async () => {

  await act(async () => {
    render(
      <Provider store={appStore}>
        <RestaurantMenu />
        <Cart />
      </Provider>
    );
  });
  const accordianHeader = screen.getByText("Pizzas (5)");
  fireEvent.click(accordianHeader); // expanding pizza food category
  const addBtns = screen.getAllByRole("button", { name: "Add" });
  console.log(addBtns.length); // getting 5 pizza items and 2 from above test = total 7 items
  fireEvent.click(addBtns[2]); // clicking on the third pizza item
  console.log(screen.getAllByTestId("foodItems").length); // 5 pizza items from restaurant menu and 1 item from cart page = 6 items and 2 from above test = total 8 items
  const removeBtns = screen.getAllByText("-");
  console.log(removeBtns.length); // 1 item having - as only 1 item was added

  fireEvent.click(removeBtns[0]); // removing the first item that was added

  expect(screen.getAllByTestId("foodItems").length).toBe(7); // back to 7 items as 1 item from cart page was removed by clicking - button and 2 from above test
});
