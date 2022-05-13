import { Constant, setBehavior } from "../src/behavior";

describe("Test Constant behavior", () => {
  let constant: Constant;
  beforeEach(() => {
    constant = setBehavior(0, "Constant") as Constant;
  });
  it("Should has no inport", () => {
    expect(constant.inportNum).toBe(0);
  });
  it("Output of initial value should be 1", () => {
    expect(constant.out(1)).toBe(1);
  });
  it("The step state after output should be incremented", () => {
    constant.out(1);
    expect(constant.steps).toBe(1);
  });
  it("The step state after 10 times output should be 10", () => {
    Array(10)
      .fill(null)
      .forEach((_, i) => constant.out(i + 1));
    expect(constant.steps).toBe(10);
  });
  it("The step state should not change if the same steps are entered", () => {
    constant.out(1);
    expect(constant.steps).toBe(1);
    constant.out(1);
    expect(constant.steps).toBe(1);
  });
  it("toString() should output constant value", () => {
    expect(constant.toString()).toBe("1");
    constant.property.constant = 1000;
    expect(constant.toString()).toBe("1000");
  });
  it("If the constant value is not numerical value, check() should return false", () => {
    constant.property.constant = NaN;
    expect(constant.check()).toBe(false);
  });
});
