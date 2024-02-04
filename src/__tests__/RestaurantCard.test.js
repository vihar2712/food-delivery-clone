import { render, screen } from "@testing-library/react";
import SwiggyCardContainer, {
  withPromotedLabel,
} from "../components/SwiggyCardContainer";
import MOCK_RES_CARD from "../mocks/resCardMock.json";
import PROMOTED_MOCK_RES_CARD from "../mocks/promotedResMock.json";
import "@testing-library/jest-dom";
import Body from "../components/Body";

test("should render Restaurant card component with props data", () => {
  render(<SwiggyCardContainer resData={MOCK_RES_CARD} />);

  const resName = screen.getByText("KFC");

  //   Assertion
  expect(resName).toBeInTheDocument();
});

// test("should render Restaurant card component with promoted label", () => {


//   const PromotedRestaurants = withPromotedLabel(SwiggyCardContainer);
// //   console.log(<PromotedRestaurants />);

// //   render(<PromotedRestaurants />);

// //   render(<PromotedRestaurants resData={MOCK_RES_CARD}/>)
//   const label = screen.getByText("Promoted");
//   //   Assertion
//   expect(label).toBeInTheDocument();
// });
