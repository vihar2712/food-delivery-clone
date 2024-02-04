import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import "@testing-library/jest-dom";

describe("Test cases for contact components", () => {
  beforeAll(() => {
    console.log("Before all test cases");
  });

  beforeEach(() => {
    console.log("Before each test cases");
  });

  afterEach(() => {
    console.log("After each test cases");
  });

  afterAll(() => {
    console.log("After all test cases");
  });
  test("should load the heading of Contact component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument(); //Assertion
  });

  test("should have button inside component", async () => {
    render(<Contact />);

    const button1 = await screen.findByText("Submit"); //findByText() returns a promise => resolved value => React Element
    const button2 = screen.getByText("Submit"); //getByText() returns a react element directly
    //   console.log(button1);
    //   console.log(button2);

    expect(button2).toBeInTheDocument();
  });

  test("should have 2 input boxes inside contact component", () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole("textbox");
    //   console.log(inputBoxes.length);
    expect(inputBoxes.length).toBe(2);
  });

  // arguments to pass inside getByRole() type functions
  // <h*> => "heading"
  // <input type="text"/> => "textbox"
  //<button> =>"button"
  // <input type="radio"/> => "radio"

  test("should have 2 radio buttons inside contact component", () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole("radio");
    //   console.log(inputBoxes.length);
    expect(inputBoxes.length).not.toBe(2);
  });
});
