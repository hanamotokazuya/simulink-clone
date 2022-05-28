import * as bv from "./index";

/**
 * nameに応じたふるまいインスタンスを生成する
 * @param id
 * @param name
 * @returns nameに応じたふるまいインスタンス
 */
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
    case "Arithmetic":
      return new bv.Arithmetic(id);
    default:
      throw new Error("Error!");
  }
};
