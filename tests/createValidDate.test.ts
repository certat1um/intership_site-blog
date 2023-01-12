import { createValidDate } from "../src/helpers/createValidDate";

describe("Validating Date", () => {
  it("fully correct", () => {
    const date = new Date("1, 1, 1990");

    const res = createValidDate(date);

    expect(res).toBe("1989-12-31");
  });
});
