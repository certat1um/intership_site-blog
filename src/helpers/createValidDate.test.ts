import { createValidDate } from "./createValidDate";

it("returns correct format of Date", () => {
  const date = new Date("1, 1, 1990");

  const res = createValidDate(date);

  expect(res).toBe("1989-12-31");
});
