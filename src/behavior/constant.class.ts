import { Behavior } from "./behavior.class";

/**
 * 定数のふるまいを司るクラス
 */
export class Constant extends Behavior {
  name: string;
  property: { constant: string };
  constructor(id: number, constant: number) {
    super();
    this.id = id;
    this.name = "Constant";
    this.property = { constant: String(constant) };
    this.inportNum = 0;
    this.addBehavior(String(id));
    this.oldValue = [Number(this.property.constant)];
  }
  init() {
    this.steps = 0;
    this.oldValue = [Number(this.property.constant)];
  }
  out(steps: number) {
    if (this.steps === steps) {
      return this.oldValue;
    }
    this.steps++;
    return this.oldValue;
  }
  check() {
    isNaN(Number(this.property.constant)) && // constant は数値であるか
      Behavior.errorMessages.push(`${this.name}${this.id}のパラメータは不正な値です。`);
  }
  toString() {
    return String(this.property.constant);
  }
}
