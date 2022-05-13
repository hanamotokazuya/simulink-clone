import * as bv from "./index";

export const setBehavior = (id: number, name: string): bv.Behavior => {
  switch (name) {
    case "Gain":
      return new bv.Gain(id, 1);
    case "Constant":
      return new bv.Constant(id, 1);
    case "Integrator":
      return new bv.Integrator(id, 0);
    case "Scope":
      return new bv.Scope(id);
    default:
      throw new Error("Error!");
  }
};
