import { setBehavior, Constant, Gain, Integrator, Scope } from "../src/behavior";

describe("Test setBehavior", () => {
  it("Should make Constant", () => {
    const constant = setBehavior(0, "Constant");
    expect(constant instanceof Constant).toBe(true);
  });
  it("Should make Gain", () => {
    const gain = setBehavior(0, "Gain");
    expect(gain instanceof Gain).toBe(true);
  });
  it("Should make Integrator", () => {
    const integrator = setBehavior(0, "Integrator");
    expect(integrator instanceof Integrator).toBe(true);
  });
  it("Should make Scope", () => {
    const scope = setBehavior(0, "Scope");
    expect(scope instanceof Scope).toBe(true);
  });
});
