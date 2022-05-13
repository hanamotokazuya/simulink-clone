import { Behavior } from "./behavior.class";

export class Constant extends Behavior {
  name: string;
  property: { constant: number };
  constructor(id: number, constant: number) {
    super();
    this.id = id;
    this.name = "Constant";
    this.property = { constant };
    this.inportNum = 0;
    this.addBehavior(String(id));
    this.oldValue = this.property.constant;
  }
  init() {
    this.steps = 0;
    this.oldValue = this.property.constant;
  }
  out(steps: number) {
    this.steps++;
    return this.oldValue;
  }
  toString() {
    return String(this.property.constant);
  }
}
