import { Behavior } from "./behavior.class";

/**
 * ブロックに定数のふるまいを与える．
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
    if (
      !isNaN(Number(this.property.constant)) // constant は数値であるか
    ) {
      return true;
    } else {
      return false;
    }
  }
  toString() {
    return String(this.property.constant);
  }
}
