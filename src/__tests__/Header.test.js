import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("should load header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //   Assertion
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("should load header component with cart items 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //   Assertion
  const cartItems = screen.getByText("Cart (0 items)");
  expect(cartItems).toBeInTheDocument();
});

test("should load header component with a cart item", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //   Assertion
  const cartItems = screen.getByText(/Cart/);
  expect(cartItems).toBeInTheDocument();
});

test("should change text of login btn to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //   Assertion
  const loginBtn = screen.getByRole("button",{name: "Login"});
  fireEvent.click(loginBtn);
  const logoutBtn = screen.getByRole("button",{name:"Logout"});
  expect(logoutBtn).toBeInTheDocument();
});
