import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../components/Body";
import SEARCH_MOCK_DATA from "../mocks/mockSearch.json";
import PROMOTED_SEARCH_MOCK_DATA from "../mocks/mockPromotedSearch.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(SEARCH_MOCK_DATA);
    },
  });
});
test("should render Restaurants by searching burger text input ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  console.log(cardsBeforeSearch.length);

  const inputBox = screen.getByTestId("searchInput");
  fireEvent.change(inputBox, { target: { value: "pizza" } });

  const searchBtn = screen.getByRole("button", { name: "Search" });
  fireEvent.click(searchBtn);

  const cardsAfterSearch = screen.getAllByTestId("resCard");
  console.log(cardsAfterSearch.length);

  expect(cardsAfterSearch.length).toBe(2);
});

test("should filter Restaurants by clicking filter button ", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeFilter = screen.getAllByTestId("resCard");
  console.log(cardsBeforeFilter.length);

  const filterBtn = screen.getByRole("button", { name: "Top Rated" });
  fireEvent.click(filterBtn);

  const cardsAfterFilter = screen.getAllByTestId("resCard");
  console.log(cardsAfterFilter.length);

  expect(cardsAfterFilter.length).toBe(8);
  const unFilterBtn = screen.getByRole("button", { name: "Top Rated ❌" });
  console.log(unFilterBtn);

    fireEvent.click(unFilterBtn);
    console.log("back to normal");

  //     const cardsBackToNormal = screen.getAllByTestId("resCard");
  //     console.log(cardsBackToNormal.length);

  //   expect(cardsBackToNormal.length).toBe(10);
});
