import { sum } from "../utils/sum";

test("sum function should add the two numbers", () => {
  const result = sum(4, 8);

  expect(result).toBe(12);
});

